import { gql } from 'apollo-server-express';
import { GraphQLSchemaModule } from '@apollo/subgraph/dist/schema-helper';
import jwksClient from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import { MyContext } from './types/context';
import {
  AUTH_HOST,
  COOKIE_NAME,
  AUTH_REALM,
  KEYCLOAK_CLIENT_ID,
} from './constants';
import { authClient } from './authClient';
import { decrypt } from './util';
import fetch from 'node-fetch';
import { decode } from 'jsonwebtoken';

const blmJwkLink = process.env.BLM_AUTH_JWK_LINK || '';

const blmUserInfo = process.env.BLM_AUTH_USER_INFO || '';

const certClient = jwksClient({
  jwksUri: `${AUTH_HOST}/auth/realms/${AUTH_REALM}/protocol/openid-connect/certs`,
  timeout: 1000 * 60, // 60 seconds
});

const blmCertClient = jwksClient({
  jwksUri: blmJwkLink,
  timeout: 1000 * 60, // 60 seconds
});

const getKey: jwt.GetPublicKeyOrSecret = (header, callback) => {
  certClient.getSigningKey(header.kid, (err, key) => {
    const signingKey = key?.getPublicKey();
    callback(err, signingKey);
  });
};

const getBlmKey: jwt.GetPublicKeyOrSecret = (header, callback) => {
  blmCertClient.getSigningKey(header.kid, (err, key) => {
    const signingKey = key?.getPublicKey();
    callback(err, signingKey);
  });
};

export const authSchema: LocaleSchema = {
  name: 'auth.local',
  url: 'auth.local',
  schema: {
    typeDefs: gql`
      input BLMUser {
        # this is user id
        uuid: ID!
        firstName: String!
        lastName: String!
        email: String
        roles: [String]!
      }
      type KeycloakUser {
        # this is user id
        sub: ID!
        acr: String!
        azp: String!
        #allowed-origins: [String]!
        email: String
        email_verified: Boolean!
        exp: Int!
        family_name: String!
        given_name: String!
        iat: Int!
        iss: String!
        jti: String!
        name: String
        preferred_username: String!
        scope: String!
        session_state: String!
        sid: String!
        typ: String!
        roles: [String]!
      }
      type AuthError {
        error: String!
        error_description: String!
      }
      type AuthResponse {
        user: User
        error: AuthError
      }
      type User @key(fields: "sub") {
        sub: ID!
        preferred_username: String
        name: String
        email: String
        roles: [String]
      }
      extend type Query {
        me: User
      }
      extend type Mutation {
        login(username: String!, password: String!): AuthResponse!
        logout: Boolean!
        authenticate(
          access_token: String!
          expires_in: Int!
          refresh_token: String!
        ): AuthResponse!
        authenticateBLM(
          access_token: String!
          expires_in: Int!
          refresh_token: String!
          blmUser: BLMUser!
        ): AuthResponse!
      }
    `,
    resolvers: {
      Query: {
        me: async (_, __, { req, res }: MyContext) => {
          return new Promise(resolve => {
            const accessToken = req.session.accessToken;

            if (!accessToken) {
              console.log('[DEBUG]: Me Query access token does not exists.');
              res.clearCookie(COOKIE_NAME, {
                httpOnly: false,
                sameSite: 'none', // csrf
                secure: true, // cookie only works in https
              });
              resolve(null);
            } else {
              console.log('[DEBUG]: Me Query access token exists.');
              if (req.session.provider === 'BLM') {
                const user = {
                  sub: '',
                  email: '',
                  name: '',
                  preferred_username: '',
                  roles: [''],
                };
                fetch(blmUserInfo, {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    contentType: 'application/json',
                  },
                })
                  .then(async res => {
                    const data = await res.json();
                    user.sub = data.user.uuid;
                    user.email = data.user.email;
                    user.name = data.user.firstName + ' ' + data.user.lastName;
                    user.preferred_username =
                      data.user.firstName + ' ' + data.user.lastName;

                    if (data.user.roles.length > 0) {
                      for (const role of data.user.roles) {
                        if (role.includes('USER')) {
                          user.roles.push('USER');
                        } else if (role.includes('ADMIN')) {
                          user.roles.push('ADMIN');
                        }
                      }
                    }

                    resolve(user);
                  })
                  .catch(err => {
                    console.log('[DEBUG] ME Query error happened.', err);
                  });
              } else {
                const user = decode(accessToken) as UserType;

                user.roles =
                  user.resource_access?.[KEYCLOAK_CLIENT_ID]?.roles || [];

                resolve(user);
              }
            }
          });
        },
      },
      Mutation: {
        login: async (
          _,
          { username, password }: LoginArgs,
          { req }: MyContext
        ) => {
          return new Promise(resolve => {
            // 1. Get user from auth provider
            authClient<AuthResponse>(
              'token',
              {
                grant_type: 'password',
                username,
                password,
              },
              'Keycloak'
            )
              .then(data => {
                if (!data.success || !data.token) {
                  resolve({
                    user: null,
                    error: data.error,
                  });
                } else {
                  // 2. Verify token
                  jwt.verify(
                    data.token!.access_token,
                    getKey,
                    (err, decoded) => {
                      if (err) {
                        console.log(err);
                        throw new Error(err.message);
                      } else {
                        const user = decoded as UserType;
                        user.roles =
                          user.resource_access?.[KEYCLOAK_CLIENT_ID]?.roles ||
                          [];
                        // 3. Add data to the session
                        const roles: string[] = [];
                        if (user.roles.length > 0) {
                          for (const role of user.roles) {
                            roles.push(role);
                          }
                        }

                        req.session.user = {
                          id: user.sub,
                          roles,
                        };
                        req.session.accessToken = data.token!.access_token;
                        req.session.refreshToken = data.token!.refresh_token;
                        // 4. Set expires to the accesToken expiration date
                        req.session.expires = data.token!.expires_in * 1000;
                        resolve({
                          user,
                          error: null,
                        });
                      }
                    }
                  );
                }
              })
              .catch(err => {
                console.error('Could not login', err);
                resolve({
                  user: null,
                  error: {
                    error: 'login_failed',
                    error_description: 'Could not login',
                  },
                });
              });
          });
        },
        authenticate: async (
          _,
          {
            access_token,
            refresh_token,
            expires_in,
          }: {
            access_token: string;
            refresh_token: string;
            expires_in: number;
            provider: string;
          },
          { req }: MyContext
        ) => {
          return new Promise(resolve => {
            jwt.verify(decrypt(access_token), getKey, (err, decoded) => {
              if (err) {
                console.log(
                  '[DEBUG]: [Keycloak] Authenticate error happened ',
                  err
                );
                resolve({
                  user: null,
                  error: { error: 'Logout', error_description: err.message },
                });
              } else {
                const user = decoded as UserType;
                user.roles =
                  user.resource_access?.[KEYCLOAK_CLIENT_ID]?.roles || [];
                const roles: string[] = [];
                if (user.roles.length > 0) {
                  for (const role of user.roles) {
                    roles.push(role);
                  }
                }
                req.session.user = {
                  id: user.sub,
                  roles,
                };
                req.session.accessToken = decrypt(access_token);
                req.session.refreshToken = decrypt(refresh_token);
                req.session.expires = expires_in * 1000;

                resolve({
                  user,
                  error: null,
                });
              }
            });
          });
        },
        logout: (_, __, { req, res }: MyContext) => {
          const refreshToken = req.session.refreshToken;
          if (!refreshToken) return false;

          const provider = req.session.provider || 'Keycloak';
          return new Promise(resolve => {
            // 1. Destroy session
            req.session.destroy(err => {
              // 2. Clear cookie
              res.clearCookie(COOKIE_NAME);
              if (err) {
                console.log('Could not destroy redis user session', err);
                resolve(false);
              }

              // 3. Logout from auth provider
              authClient(
                'logout',
                {
                  refresh_token: refreshToken,
                },
                provider
              );

              resolve(true);
            });
          });
        },
        authenticateBLM: async (
          _,
          {
            access_token,
            refresh_token,
            expires_in,
            blmUser,
          }: {
            access_token: string;
            refresh_token: string;
            expires_in: number;
            blmUser: BLMUserType;
          },
          { req }: MyContext
        ) => {
          return new Promise(resolve => {
            jwt.verify(decrypt(access_token), getBlmKey, err => {
              if (err) {
                console.log('[DEBUG]: [BLM] Authenticate error happened ', err);
                resolve({
                  user: null,
                  error: { error: 'Logout', error_description: err.message },
                });
              } else {
                const blm_user = blmUser;
                const roles: string[] = [];
                if (blm_user.roles.length > 0) {
                  for (const role of blm_user.roles) {
                    if (role.includes('USER')) {
                      roles.push('USER');
                    } else if (role.includes('ADMIN')) {
                      roles.push('ADMIN');
                    }
                  }
                }

                req.session.user = {
                  id: blm_user.uuid,
                  roles,
                };
                req.session.accessToken = decrypt(access_token);
                req.session.refreshToken = decrypt(refresh_token);
                req.session.expires = expires_in * 1000;
                req.session.provider = 'BLM';

                resolve({
                  user: {
                    sub: blm_user.uuid,
                    name: blm_user.firstName,
                    email: blm_user.email,
                    preferred_username:
                      blm_user.firstName + ' ' + blm_user.lastName,
                  },
                  error: null,
                });
              }
            });
          });
        },
      },
    },
  },
};

interface BLMUserType {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

interface UserType {
  'allowed-origins': string[];
  resource_access?: Record<string, Record<'roles', string[]>>;
  groups?: any[];
  acr: string;
  azp: string;
  email?: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name?: string;
  preferred_username: string;
  scope: string;
  session_state: string;
  sid: string;
  sub: string;
  typ: string;
  roles: string[];
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  'not-before-policy': number;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  session_state: string;
  token_type: string;
}

interface AuthError {
  error: string;
  error_description: string;
}

export interface AuthResponse {
  success: boolean;
  status: number;
  statusText: string;
  token?: TokenResponse;
  error?: AuthError;
}

export interface LocaleSchema {
  name: string;
  url: string;
  schema: GraphQLSchemaModule;
}

interface LoginArgs {
  username: string;
  password: string;
}
