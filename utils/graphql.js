import { ApolloClient, InMemoryCache } from "@apollo/client";

const graphUri = "https://graphql.anilist.co";
const client = new ApolloClient({
  uri: graphUri,
  cache: new InMemoryCache(),
});

export default client;
