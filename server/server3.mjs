//Graph-QL
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
// /@apollo/server.ts";
// import * as ApolloServer from "apollo-server";
// import * as ApolloServer from "./node_modules/@apollo/server/src/ApolloServer.ts";
// "@apollo/server/src/standalone/index.ts";
// import * as startStandaloneServer from "apollo-server";
// import * as startStandaloneServer from "./node_modules/@apollo/server/standalone/";
import * as typeDefs from "./src/typeDef-Resolvers/Schema/typeDef.mjs";
import { SCHEMA } from "../server/src/typeDef-Resolvers/Resolvers/schema.mjs";

const resolvers = SCHEMA;
const apolloServer = new ApolloServer();
// const StartStandaloneServer = { startStandaloneServer };
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
//? Import schema typedefs below

//? Defined Data

//? Resolvers

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new apolloServer({
  typeDefs,
  resolvers,
});

console.log(server);
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

async function URL() {
  var url = () => {
    return startStandaloneServer(server, {
      listen: { port: 4000 },
    });
  };
}
//   return await startStandaloneServer(server, {
//     listen: { port: 4000 },
//   });
// }

console.log(`🚀  Server ready at: ${URL}`);
