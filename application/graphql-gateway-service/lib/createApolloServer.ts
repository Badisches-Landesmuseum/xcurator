import { ApolloServer } from 'apollo-server-express';
import {
  ApolloGateway,
  IntrospectAndCompose,
  LocalGraphQLDataSource,
  RemoteGraphQLDataSource,
  ServiceEndpointDefinition,
} from '@apollo/gateway';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import depthLimit from 'graphql-depth-limit';
import Redis, { Cluster } from 'ioredis';
import { BaseRedisCache } from 'apollo-server-cache-redis';
import { InMemoryLRUCache } from 'apollo-server-caching';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { Server } from 'http';
import { sleep } from './util';
import { MyContext } from './types/context';
import { authSchema, LocaleSchema } from './auth-schema';
import { is_staging_or_production } from './constants';

const endpointList = process.env.GRAPHQL_ENDPOINT_LIST || '';
const graphqlDepthLimit = Number(process.env.GATEWAY_MAX_DEPTH || 3);
const debugEnabled = Boolean(process.env.DEBUG_ENABLED);
const environment = process.env.ENVIRONMENT || 'DEVELOPMENT';
const redisSetupType = String(process.env.REDIS_SETUP_TYPE || 'standalone');

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const AUTH_REALM = process.env.AUTH_REALM;

console.log(`[Apollo]: environment is set to '${environment}'`);

console.log(
  `[Apollo]: authentication is bound to the following realm '${AUTH_REALM}'`
);

let dreipcCache: BaseRedisCache | InMemoryLRUCache;

if (
  REDIS_HOST !== undefined &&
  REDIS_PASSWORD !== undefined &&
  REDIS_PORT !== undefined
) {
  console.log(
    `[Apollo]: Redis is configured with host ${REDIS_HOST}, enabling Redis cache, connecting to Redis ${redisSetupType}`
  );
  dreipcCache = new BaseRedisCache({
    client:
      redisSetupType == 'standalone'
        ? (new Redis({
            host: REDIS_HOST,
            port: +REDIS_PORT,
            password: REDIS_PASSWORD,
          }) as any)
        : new Redis.Cluster([{ host: REDIS_HOST, port: +REDIS_PORT }], {
            redisOptions: { password: REDIS_PASSWORD },
          }),
  });
} else {
  console.log(
    "[Apollo]: No Redis is configured, falling back to Apollo's InMemoryLRUCache"
  );
  dreipcCache = new InMemoryLRUCache();
}

console.log(`[Apollo]: endpointList is: ${endpointList}`);
let serviceList: ServiceEndpointDefinition[] = endpointList
  .split(',')
  .filter(Boolean) // filter empty, i.e. when list ends with "",""
  .map(tupleString => {
    const tuple = tupleString.trim().split(' ');
    return {
      name: tuple[0],
      url: tuple[1],
    };
  });

// Add your locale schemas here
const localeSchemas: LocaleSchema[] = [authSchema];

export async function createApolloServer(
  httpServer: Server,
  redis: Cluster | Redis
) {
  let gateway: ApolloGateway;
  let gatewayLoader;
  let success = false;
  const failedServices = [];
  const wait = 10000;
  const localeSchemaList = localeSchemas.map(s => ({
    name: s.name,
    url: s.url,
  }));

  while (!success) {
    try {
      console.log(
        `[Apollo]: Loading gateway with ${serviceList.length} remote service(s)`
      );
      console.log(
        `[Apollo]: Loading gateway with ${localeSchemas.length} locale schema(s)`
      );
      gateway = new ApolloGateway({
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [...localeSchemaList, ...serviceList],
        }),
        buildService: (service: ServiceEndpointDefinition) => {
          const { name, url } = service;
          if (name.includes('.local')) {
            return new LocalGraphQLDataSource(
              buildSubgraphSchema(localeSchemas.map(s => s.schema))
            );
          } else {
            // NOTE: this will send the session id to every remote service with every request, and the remote service
            // will need then to retrieve the session (FROM REDIS, since the gateway is using redis)
            return new RemoteGraphQLDataSource({
              url,
              honorSubgraphCacheControlHeader: false,
              willSendRequest({ request, context }) {
                if (request.http && context.req?.session) {
                  const cookie = `sid=${context.req?.session.id}`;
                  request.http.headers.set('Cookie', cookie);
                }
              },
            });
          }
        },
        debug: debugEnabled,
        serviceHealthCheck: true,
        // TODO: Configure timeout https://github.com/apollographql/federation/issues/193, currently can take up to 30 seconds per service
      });
      gatewayLoader = await gateway.load();
      success = true;
    } catch (error: any) {
      // Removed failed service from the list and retry
      if (environment == 'PRODUCTION') {
        console.error('[Apollo]:', error.message);
        console.error(
          `[Apollo]: Restarting until all configured endpoints contacted successfully. Restarting in ${
            wait / 1000
          } seconds...`
        );
        await sleep(wait);
        process.exit(100);
      }
      if (serviceList.length > 0) {
        serviceList = serviceList.filter(
          service =>
            !error.message.includes(service.url) &&
            !error.message.includes('[' + service.name + ']')
        );
        console.error('[Apollo]:', error.message);
        failedServices.push(error.message);
      } else {
        console.error('[Apollo]:', error.message);
        console.error('[Apollo]: All given services failed, dying...');
        process.exit(101);
      }

      console.warn(
        `[Apollo]: Retrying without failed service in ${
          wait / 1000
        } seconds ...`
      );
      await sleep(wait);
    }
  }

  console.log(
    '[Apollo]: Remote Services:\n ' + JSON.stringify(serviceList, null, '  ')
  );
  console.log(
    '[Apollo]: Locale Schemas:\n ' +
      JSON.stringify(localeSchemaList, null, '  ')
  );
  if (failedServices.length > 0) {
    console.warn(
      `[Apollo]: Following remote services failed to start:  ${JSON.stringify(
        failedServices,
        null,
        '  '
      )}`,
      failedServices
    );
  }
  console.log(
    `[Apollo]: Loaded ${serviceList.length} service(s); ${failedServices.length} failed`
  );

  if (gatewayLoader) {
    const { schema, executor } = gatewayLoader;

    return new ApolloServer({
      schema,
      executor,
      // NOTE: Introspection is disabled on staging and production
      introspection: !is_staging_or_production,
      cache: dreipcCache,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
          : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
        {
          requestDidStart: context => {
            if (context.request.http?.headers.get('X-Reload-Gateway')) {
              gateway.load();
            }
            return Promise.resolve();
          },
        },
      ],
      validationRules: [depthLimit(graphqlDepthLimit)],
      context: ({ req, res }): MyContext => {
        const token = req.headers.authorization || 'Bearer ';
        return { req, res, redis, token };
      },
      formatError: err => {
        console.error(err);
        return err;
      },
      debug: debugEnabled,
    });
  }
}
