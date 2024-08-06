//?-- apolloServer.js--
import * as apolloServer from "apollo-server-express";
import * as DOCUMENTS from "./src/typeDef-Resolvers/Resolvers/resolvers.mjs";

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
