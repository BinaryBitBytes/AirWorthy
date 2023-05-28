import { ApolloServer, gql } from 'apollo-server';
import { typeDefs } from "../src/typeDef-Resolvers/index.js";
import { resolvers } from "../src/typeDef-Resolvers/index.js";

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});