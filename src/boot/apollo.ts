import { boot } from 'quasar/wrappers';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';

const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

export default boot(({ app }) => {
  app.provide(DefaultApolloClient, apolloClient);
});
