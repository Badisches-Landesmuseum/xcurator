import 'dotenv/config';
import http from 'http';
import { createServer } from './createServer';
import { createApolloServer } from './createApolloServer';
import { createWebsocket } from './ws';
import { graphqlPath, playgroundPath } from './constants';

const port = Number(process.env.GATEWAY_PORT || 8080);
const enableKeycloak = Boolean(process.env.KEYCLOAK_ENABLED);

// Mandatory variable checks:
if (!process.env.SESSION_SECRET) {
  throw new Error('💥 Mandatory variable SESSION_SECRET is not set');
}

async function main() {
  const { app, redisClient, redisStore } = createServer({
    enableKeycloak,
  });
  const httpServer = http.createServer(app);
  const apolloServer = await createApolloServer(httpServer, redisClient);
  createWebsocket(httpServer, redisStore);

  if (!apolloServer) {
    throw new Error('💥 Could not start Apollo Server');
  }

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  httpServer.listen(port);
  console.log(`🚀 Graphql: http://localhost:${port}${graphqlPath}`);
  console.log(`🎠 Playground: http://localhost:${port}${playgroundPath}`);
  console.log(`🐝 WebSocket: ws://localhost:${port}`);
}

main().catch(err => {
  console.error('💥 Could not start server', err);
});
