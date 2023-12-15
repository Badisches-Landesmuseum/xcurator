import express, { NextFunction, Request, Response } from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import cors from 'cors';
import compression from 'compression';
import zlib from 'zlib';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { configureKeycloak } from './configureKeycloak';
import {
  COOKIE_NAME,
  __prod__,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  playgroundPath,
  graphqlPath,
  is_staging_or_production,
} from './constants';
import { connections, logoutMsg } from './ws';
import { actuatorRoutes } from './middleware/actuator';
import { sleep } from './util';
import { authClient } from './authClient';
import { AuthResponse } from './auth-schema';

const corsWhitelist = process.env.GATEWAY_CORS_WHITELIST?.split(',') || [];
const redisSetupType = String(process.env.REDIS_SETUP_TYPE || 'standalone');

const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (
      !__prod__ ||
      process.env.GATEWAY_CORS_DISABLED === 'true' ||
      (origin && corsWhitelist.includes(origin))
    ) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} is not allowed by CORS`), false);
    }
  },
};

export function createServer({
  enableKeycloak = false,
}: {
  enableKeycloak?: boolean;
}) {
  const app = express();
  const RedisStore = connectRedis(session);

  console.log(`🤖 Session: Connecting to Redis '${redisSetupType}'`);
  let redisClient: any;
  if (redisSetupType == 'standalone') {
    redisClient = new Redis({
      host: REDIS_HOST,
      port: +REDIS_PORT!,
      password: REDIS_PASSWORD,
    });
  } else if (redisSetupType == 'cluster') {
    redisClient = new Redis.Cluster(
      [{ host: REDIS_HOST, port: +REDIS_PORT! }],
      {
        redisOptions: {
          password: REDIS_PASSWORD,
        },
      }
    );
  } else {
    throw new Error(
      '💥 REDIS_SETUP_TYPE must be either `standalone` or `cluster`'
    );
  }

  redisClient.on('connect', () => {
    console.log('🤖 Session: Connecting to Redis ...');
  });
  redisClient.on('error', (err: Error) => {
    console.error('💥 Session: Could not establish a connection to Redis', err);
    sleep(3000);
  });
  redisClient.on('ready', () => {
    console.log('🤖 Session: Connection to Redis is ready');
  });

  if (!is_staging_or_production) {
    if (enableKeycloak) {
      const { keycloak } = configureKeycloak(app, graphqlPath);
      app.use(playgroundPath, keycloak.protect());
    }
  }

  // Enable this if you're behind a proxy (nginx, etc). ExpressJS doc: https://expressjs.com/en/guide/behind-proxies.html
  // It is safe to assume, that any non-local-development (DEV, staging, production) environment is behind a TLS proxy
  app.set('trust proxy', __prod__);

  app.disable('x-powered-by');

  app.use(cors(corsOptions));

  const redisStore = new RedisStore({
    client: redisClient,
    disableTouch: true,
  });

  // NOTE: Use default name for cookie "connect.sid", that's why name is not specified here
  // NOTE: This will be used to store the session id in the cookie, and then use that to fetch the session data from Redis
  // NOTE: This will create a new session each time a request comes in without cookie
  const sessionParser = session({
    store: redisStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
      httpOnly: false,
      sameSite: 'none', // csrf
      secure: __prod__, // if true, cookie only works in HTTPS // TODO: may not work in localdev docker-compose setup (__prod__=true, but HTTP-only)
    },
    saveUninitialized: false,
    secret: String(process.env.SESSION_SECRET), // https://github.com/expressjs/session#cookiesecure
    resave: false,
    proxy: __prod__, // https://github.com/expressjs/session#proxy. Relies on "X-Forwarded-Proto" header. If multiple proxies are chained, header may need correction
  });

  app.use(sessionParser);

  async function refreshToken(req: Request, res: Response, next: NextFunction) {
    const nowTimeStamp = Date.now();
    if (
      req.session &&
      req.session.accessToken &&
      req.session.expires! < nowTimeStamp
    ) {
      const provider = req.session.provider || 'keycloak';

      authClient<AuthResponse>(
        'token',
        {
          grant_type: 'refresh_token',
          refresh_token: req.session.refreshToken!,
        },
        provider
      )
        .then(resp => {
          if (!resp.success || !resp.token) {
            req.sessionStore.destroy(req.session.id, (err: any) => {
              if (err) {
                console.log('Could not destroy Redis user session', err);
                return res.send({
                  error: { error: 'Logout', error_description: err },
                });
              }
              console.log('destroyed Redis user session');
              return res.send({
                error: { error: 'Logout' },
              });
            });
          } else {
            console.log('refreshed token');
            req.session.accessToken = resp.token!.access_token;
            req.session.refreshToken = resp.token!.refresh_token;
            req.session.expires = Date.now() + resp.token!.expires_in * 1000;
            next();
          }
        })
        .catch(err => {
          console.log('Could not refresh token ', err);
          req.sessionStore.destroy(req.session.id, (err: any) => {
            if (err) {
              console.log('Could not destroy Redis user session', err);
              return res.send({
                error: { error: 'Logout', error_description: err.message },
              });
            }
            return res.send({
              error: { error: 'Logout' },
            });
          });
        });
    } else {
      next();
    }
  }

  app.use('/graphql', refreshToken);

  app.use(compression({ level: zlib.constants.Z_BEST_SPEED }));

  app.use(actuatorRoutes);

  app.use('/backchannel-logout', async (req, res) => {
    req.sessionStore.get(req.session.id, async (err, session) => {
      if (err) {
        console.log('BL: Could not destroy Redis user session', err);
        return res.send({ success: false });
      }
      if (session) {
        console.log('BL: Logout user', session.user);
        const ws = connections.get(session.user.id);
        // 1. Destroy the session
        // TODO: check if this works
        req.sessionStore.destroy(req.session.id, err => {
          if (err) {
            console.log('BL: Could not destroy Redis user session', err);
            return res.send({ success: false });
          }
          // 2. Clear cookie
          res.clearCookie(COOKIE_NAME);
          // TODO: check if this works
          if (ws) {
            console.log(
              'BL: Got websocket connection for user',
              session.user.id
            );
            ws.send(logoutMsg);
            ws.close();
          }
          return res.send({ success: true });
        });
      } else {
        console.log('BL: No session found', session);
        return res.send({ success: false });
      }
    });
  });

  if (!is_staging_or_production) {
    app.get(playgroundPath, (req, res, next) => {
      let endpoint = graphqlPath;

      if (enableKeycloak) {
        const token = (req as any).kauth.grant.access_token.token;
        const headers = JSON.stringify({
          Authorization: `Bearer ${token}`,
        });

        endpoint += `?headers=${encodeURIComponent(headers)}`;
      }

      expressPlayground({
        endpoint,
        settings: {
          'request.credentials': 'same-origin',
        },
      })(req, res, next);
    });
  }

  return { app, redisClient, redisStore, sessionParser };
}
