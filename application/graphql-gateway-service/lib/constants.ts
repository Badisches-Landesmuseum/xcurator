// NOTE: This is also another variable about the environment, check this and align on one direction if you want to use NODE_ENV or ENVIRONMENT (SELF DEFINED)
export const __prod__ = process.env.NODE_ENV === 'production';
export const is_staging_or_production =
  process.env.IS_STAGING_OR_PRODUCTION === 'false';
export const COOKIE_NAME = 'connect.sid';
export const graphqlPath = process.env.GRAPHQL_ENDPOINT || '/graphql';
export const playgroundPath =
  process.env.GRAPHQL_PLAYGROUND_ENDPOINT || '/playground';
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
export const AUTH_HOST = process.env.AUTH_HOST!;
export const BLM_AUTH_HOST = process.env.BLM_AUTH_HOST!;
export const AUTH_REALM = process.env.AUTH_REALM!;
export const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_AUTH_CLIENT_ID!;
export const KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_AUTH_CLIENT_SECRET!;
export const BLM_CLIENT_ID = process.env.BLM_AUTH_CLIENT_ID!;
export const BLM_CLIENT_SECRET = process.env.BLM_AUTH_CLIENT_SECRET!;
