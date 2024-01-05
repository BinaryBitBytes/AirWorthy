import { ApolloServer } from "apollo-server";
import typedefs from "../../server/src/typeDef-Resolvers/index.mjs";
import { resolver } from "../../server/src/typeDef-Resolvers/index.mjs";

// const server = new ApolloServer({ typeDefs: typedefs, resolvers: resolver });
const server = new ApolloServer(
  { typeDefs: typedefs },
  { resolvers: resolver }
);

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
