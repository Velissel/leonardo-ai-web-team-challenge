import { ApolloClient, InMemoryCache } from "@apollo/client";

export default function createApolloClient() {
  return new ApolloClient({
    uri: 'https://graphql.anilist.co',
    cache: new InMemoryCache(),
  });
};