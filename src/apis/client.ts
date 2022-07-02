import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: '后台graphql地址',
  cache: new InMemoryCache({
    addTypename: false,
  }),
  credentials: 'include',
});
