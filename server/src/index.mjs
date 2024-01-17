import { ApolloServer } from "apollo-server";
import typeDefs from "../../server/src/typeDef-Resolvers/index.mjs";
import { resolver } from "../../server/src/typeDef-Resolvers/index.mjs";
const TYPEDEFS = () => {
  return { typeDefs };
};

class server {
  constructor() {
    this.server = new ApolloServer(TYPEDEFS, resolver); //? Error 1.16.24
    server.listen().then(({ url }) => {
      let { url } = "127.0.0.1:3001";
      console.log(`🚀  Server ready at ${url}`);
    });

    // const server = new ApolloServer(TYPEDEFS, resolver); //? Error 1.16.24
    // server.listen().then(({ url }) => {
    //   url = "127.0.0.1:3001";
    //   console.log(`🚀  Server ready at ${url}`);
    // });
  }
}
console.log(server);

class apolloServer extends server {}
