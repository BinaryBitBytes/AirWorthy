//?-- apolloServer.js--
import * as ApolloServer from "apollo-server";
// import * as APOLLOSERVER from "./node_modules/apollo-server/dist/index.js";
import * as DOCUMENTS from "./src/typeDef-Resolvers/Resolvers/resolvers.mjs";
const apolloServer = { ApolloServer };
const _APOLLOSERVER_ = new apolloServer();

var _DOCUMENTS_ = () => {
  // class box(string, id, index) {
  class box {
    constructor(string, id, index) {
      this.string = string;
      this.id = { id: id };
      this.index = index;
    }

    // super box(string, id, index);
  }
  console.log(box);

  let tell = apolloServer.gql(toString(...DOCUMENTS));

  console.log(tell);
};
