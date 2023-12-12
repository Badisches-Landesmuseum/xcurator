import type { Express } from 'express';
import session from 'express-session';
import Keycloak from 'keycloak-connect';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';

const KEYCLOAK_HOST = process.env.AUTH_HOST;
const KEYCLOAK_REALM = process.env.AUTH_REALM;
const KEYCLOAK_CLIENT_ID = process.env.AUTH_CLIENT_ID;

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const RedisStore = connectRedis(session);

// Configure redis client
const redisClient = new Redis({
  host: REDIS_HOST,
  port: +REDIS_PORT!,
  password: REDIS_PASSWORD,
}) as any;

export function configureKeycloak(app: Express, graphqlPath: string) {
  const redisStore = new RedisStore({ client: redisClient });

  app.use(
    session({
      secret: String(process.env.SESSION_SECRET),
      resave: false,
      saveUninitialized: true,
      store: redisStore,
    })
  );

  const keycloak = new Keycloak(
    {
      store: redisStore,
    },
    {
      'auth-server-url': KEYCLOAK_HOST + '/auth',
      realm: KEYCLOAK_REALM,
      clientId: KEYCLOAK_CLIENT_ID,
    } as any // NOTE: keycloak types are messed up, check that later
  );

  // Install general keycloak middleware - Allow Unauthorized but handle Authorized User
  app.use(
    keycloak.middleware({
      admin: graphqlPath,
      logout: '/logout',
    })
  );

  // Protect the main route for all graphql services
  // Disable unauthenticated access
  app.use(graphqlPath, keycloak.middleware());

  return { keycloak };
}
