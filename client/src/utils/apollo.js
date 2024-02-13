import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

//sets up apollo client uri
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3001/graphql',
  }),
  cache: new InMemoryCache(),
});

export default client;