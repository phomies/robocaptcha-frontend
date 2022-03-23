import { ApolloClient, InMemoryCache } from "@apollo/client";

let uri: string | undefined = process.env.NEXT_PUBLIC_PRODUCTION_URL;

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
});

export default client;