import { ApolloServer } from "apollo-server";
import typeDefs from "../../server/src/typeDef-Resolvers/index.mjs";
import { resolver } from "../../server/src/typeDef-Resolvers/index.mjs";
const TYPEDEFS = () => {
  return { typeDefs };
};

const server = new ApolloServer(TYPEDEFS, resolver);
server.listen().then(({ url }) => {
  url = "127.0.0.1:3001";
  console.log(`🚀  Server ready at ${url}`);
});
