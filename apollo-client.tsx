import { ApolloClient, InMemoryCache } from "@apollo/client";

let uri: string | undefined = "";
if (process.env.NEXT_PUBLIC_ENVIRONMENT == "DEVELOPMENT") {
  uri = process.env.NEXT_PUBLIC_LOCAL_URL;
}

if (process.env.NEXT_PUBLIC_ENVIRONMENT == "PRODUCTION") {
  uri = process.env.NEXT_PUBLIC_PRODUCTION_URL;
}

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
});

export default client;