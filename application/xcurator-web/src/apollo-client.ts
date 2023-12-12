import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { env } from 'next-runtime-env';

const link = createHttpLink({
  uri: env('NEXT_PUBLIC_GATEWAY_API'),
  credentials: 'include',
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
