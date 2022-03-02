import { ApolloClient, InMemoryCache } from "@apollo/client";

let uri = ""
if (process.env.NEXT_PUBLIC_ENVIRONMENT == "DEVELOPMENT") {
  uri = process.env.NEXT_PUBLIC_LOCAL_URL + "/graphql"
}

if (process.env.NEXT_PUBLIC_ENVIRONMENT == "PRODUCTION") {
  uri = process.env.NEXT_PUBLIC_PRODUCTION_URL + "/graphql"
}

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
});

export default client;