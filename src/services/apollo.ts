import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: "http://localhost:8080/",
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default apolloClient;
