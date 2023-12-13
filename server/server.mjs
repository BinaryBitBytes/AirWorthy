/*
import { buildSubgraphSchema } from '@apollo/subgraph';
import * as buildSubgraphSchema from '@apollo/subgraph';
import GraphQLServerOptions from 'apollo-server-core/dist/graphqlOptions'
import { GraphQLAbstractType } from 'graphql'
import { GraphQLArgs } from 'graphql'
import { GraphQLError } from 'graphql'
import { GraphQLList } from 'graphql'
import { GraphQLResponseBody } from '@apollo/server/dist/esm/externalTypes/graphql'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { startStandaloneServer } from '@apollo/server/standalone';
import StartStandaloneServer from '@apollo/server/standalone';
import { GraphQLSchema as gqlSchema } from "graphql";
*/
import express from "express";
import apollo from "apollo-server-core";
const { ApolloServer } = apollo;
import * as StartStandaloneServer from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph/dist/index.d.ts";
const { startStandaloneServer } = StartStandaloneServer;

import resolvers from "./src/typeDef-Resolvers/Resolvers/resolvers.mjs";
// import typeDefs from './src/typeDef-Resolvers/Schema/typeDef.mjs'
import typeDefs from "./src/typeDef-Resolvers/Schema/typeDef.mjs";

import { connectDB } from "./config/connection.mjs";
// import { data } from "jquery";
// import { prototype } from "events";
// import { sample } from "lodash";

// connecting to the mongo database
// Global function to start the server asynchronously
const startServer = async () => {
  //! const resolvers = await import ('./src/typeDef-Resolvers/Resolvers/resolvers.mjs')
  // This creates an Express application
  // // express = await express('express')
  const app = express();
  app.use(express);
  // This creates the instance of the Apollo server with the typeDefs & resolvers
  const server = async () => {
    // new ApolloServer({
    //    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    // });
    const apolloServer = new ApolloServer({
      schema: buildSubgraphSchema({
        // typeDefs: DocumentNode[typeDefs],
        typeDefs: typeDefs,
        resolvers,
      }),
    });
    await apolloServer.listen({ port: 3069 });
  };
  await server();

  //! testing
  const { url } = await startStandaloneServer(server);
  console.log(`🚀  Server ready at ${url}`);
  //!;
  // await server.listen()
  // This applies the Apollo Server Middleware into the Express application
  server.applyMiddleware({ app });
  // This starts the server and listens on the respected port address
  app.listen({ port: 3069 }, () => {
    console.log(
      `The Apollo Server is running @ http://localhost:3069${server.graphqlPath}`
    );
  });
};
// Starting the Express Server with the Mongoose Database
console.info(`Starting server.mjs`);
console.info(
  `----------------------------------------------------------------`
);
console.info(`Starting function: startServer`);
startServer(); //! @BinaryBitBytes Error 12.11.23
console.info(`Starting function: connectDB`);
connectDB();
// // startServer().catch((error) => console.log(error))
