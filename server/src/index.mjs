import { ApolloServer } from "apollo-server";
import typedefs from "../../server/src/typeDef-Resolvers/index.mjs";
import * as resolver from "../../server/src/typeDef-Resolvers/index.mjs";

export const server = new ApolloServer({
  typeDefs: typedefs,
  resolvers: resolver,
});

console.log(server);
server.listen().then(({ url }) => {
  x;
  console.log(`🚀  Server ready at ${url}`);
});
