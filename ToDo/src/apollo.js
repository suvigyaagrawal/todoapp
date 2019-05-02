import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
const GRAPHQL_ENDPOINT = `https://eu1.prisma.sh/aayushi-23b2b3/Todo/dev`;
const client = new ApolloClient({
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
    }),
    cache: new InMemoryCache()
});
export default client;
