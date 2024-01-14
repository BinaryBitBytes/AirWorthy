import { setContext } from "@apollo/client/link/context/index.js";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core/index.js";

// import * as setCon from "@apollo/client/link/context";

// import * as apolloClient from "@apollo/client";
// const setContext = () => {
//   return setCon;
// };

// const ApolloClient = () => {
//   return apolloClient;
// };

// const InMemoryCache = () => {
//   return apolloClient;
// };

// const createHttpLink = () => {
//   return apolloClient;
// };

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
