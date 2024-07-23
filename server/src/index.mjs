import { ApolloServer } from "apollo-server";
import typedefs from "../../server/src/typeDef-Resolvers/index.mjs";
import { resolvers } from "../../server/src/typeDef-Resolvers/index.mjs";

// const server = new ApolloServer({ typeDefs: typedefs, resolvers: resolver });
const server = new ApolloServer(
  { typeDefs: typedefs },
  { resolvers: resolvers }
);

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
