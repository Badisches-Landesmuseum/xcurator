import NextAuth, { NextAuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import jwt_decode from 'jwt-decode';
import { env } from 'next-runtime-env';
import { encrypt } from 'src/utils/encryption';

export const authOptions: NextAuthOptions =
  env('NEXT_PUBLIC_HOST') === 'BLM'
    ? {
        providers: [
          {
            issuer: env('NEXT_PUBLIC_BLM_ISSUER') ?? '',
            requestTokenUrl: env('NEXT_PUBLIC_BLM_REQUEST_TOKEN') ?? '',
            profileUrl: env('NEXT_PUBLIC_BLM_PROFILE') ?? '',
            id: 'BLM',
            name: 'BLM',
            type: 'oauth',
            version: '2.0',
            clientSecret: env('NEXT_BLM_SECRET') ?? '',
            clientId: env('NEXT_PUBLIC_BLM_CLIENT_ID') ?? '',
            idToken: true,
            authorization: {
              url: env('NEXT_PUBLIC_BLM_AUTHORIZATION') ?? '',
            },
            token: {
              url: env('NEXT_PUBLIC_BLM_REQUEST_TOKEN') ?? '',
            },
            userinfo: env('NEXT_PUBLIC_BLM_PROFILE') ?? '',
            jwks_endpoint: env('NEXT_PUBLIC_BLM_JWKS') ?? '',
            profile(profile) {
              return {
                id: profile.sub,
                name: profile.aud,
                provider: 'BLM',
              };
            },
          },
        ],
        callbacks: {
          redirect: async function ({ url, baseUrl }) {
            //this is the default behavior
            // Allows relative callback URLs
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return url;
          },
          jwt: async function ({ token, account }) {
            const nowTimeStamp = Math.floor(Date.now() / 1000);
            if (account) {
              token.decoded = jwt_decode(account.access_token ?? '');
              token.access_token = account.access_token ?? '';
              token.id_token = account.id_token ?? '';
              token.refresh_token = account.refresh_token ?? '';
              token.expires_in = account.expires_at ?? 0;

              const response = await fetch(
                env('NEXT_PUBLIC_BLM_PROFILE') || '',
                {
                  headers: {
                    Authorization: `Bearer ${account.access_token}`,
                    contentType: 'application/json',
                  },
                  credentials: 'include',
                }
              );
              const user = await response.json();
              token.user = user.user;
              token.decoded.realm_access = { roles: user.user.roles };

              return token;
            } else if (token && nowTimeStamp < token.expires_in) {
              const response = await fetch(
                env('NEXT_PUBLIC_BLM_PROFILE') || '',
                {
                  headers: {
                    Authorization: `Bearer ${token.access_token}`,
                    contentType: 'application/json',
                  },
                  credentials: 'include',
                }
              );

              const user = await response.json();

              token.decoded.realm_access = { roles: user.user.roles };

              // Token is valid return it
              return token;
            } else {
              // NOTE: if we want to refresh token on client side we should do it here
              return token;
            }
          },
          session: async function ({ session, token }) {
            session.access_token = encrypt(token.access_token);
            session.refresh_token = encrypt(token.refresh_token);
            session.expires_in = token.expires_in;
            session.id_token = encrypt(token.id_token);
            session.roles = token.decoded.realm_access.roles;
            session.error = token.error;
            session.user = token.user;

            return session;
          },
        },
      }
    : {
        providers: [
          KeycloakProvider({
            clientId: env('NEXT_PUBLIC_KEYCLOAK_ID') ?? '',
            clientSecret: env('NEXT_KEYCLOAK_SECRET') ?? '',
            issuer: env('NEXT_PUBLIC_KEYCLOAK_ISSUER') ?? '',
          }),
        ],
        callbacks: {
          jwt: async function ({ token, account }) {
            const nowTimeStamp = Math.floor(Date.now() / 1000);
            if (account) {
              token.decoded = jwt_decode(account.access_token ?? '');
              token.access_token = account.access_token ?? '';
              token.id_token = account.id_token ?? '';
              token.refresh_token = account.refresh_token ?? '';
              token.expires_in = account.expires_at ?? 0;

              return token;
            } else if (token && nowTimeStamp < token.expires_in) {
              // Token is valid return it
              return token;
            } else {
              // NOTE: if we want to refresh token on client side we should do it here
              return token;
            }
          },
          session: async function ({ session, token }) {
            session.access_token = encrypt(token.access_token);
            session.refresh_token = encrypt(token.refresh_token);
            session.expires_in = token.expires_in;
            session.id_token = encrypt(token.id_token);
            session.roles = token.decoded.realm_access.roles;
            session.error = token.error;

            return session;
          },
        },
      };

export default NextAuth(authOptions);
