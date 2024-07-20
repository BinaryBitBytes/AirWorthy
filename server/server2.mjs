import express from "express";
// const { ApolloServer } = apollo
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import resolvers from "./src/typeDef-Resolvers/Resolvers/resolvers.mjs";
import typeDefs from "./src/typeDef-Resolvers/Schema/typeDef.mjs";
// import GraphQLServerOptions from 'apollo-server-core/dist/graphqlOptions'
// import { GraphQLAbstractType } from 'graphql'
// import { GraphQLArgs } from 'graphql'
// import { GraphQLError } from 'graphql'
// import { GraphQLSchema } from 'graphql'
// import { GraphQLList } from 'graphql'
// import { GraphQLResponseBody } from '@apollo/server/dist/esm/externalTypes/graphql'
// import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
// import typeDefs from './src/typeDef-Resolvers/Schema/typeDef.mjs'

import { connectDB } from "./config/connection.mjs";

// connecting to the mongo database
connectDB();
// Global function to start the server asynchronously
const startServer = async () => {
  //! const resolvers = await import ('./src/typeDef-Resolvers/Resolvers/resolvers.mjs')
  // // express = await express('express')
  // This creates an Express application
  const app = express();
  // This creates the instance of the Apollo server with the typeDefs & resolvers
  const server = new ApolloServer({
    // typeDefs,
    typeDefs: typeDefs,
    resolvers: resolvers[{resolvers...}]
    // @BinaryBitBytes //? [resolvers.typeDef]
  });
  await server.start();
  // await server.listen()
  const { url } = await startStandaloneServer(server);
  // This applies the Apollo Server Middleware into the Express application
  console.log(`🚀  Server ready at ${url}`);
  server.applyMiddleware({ app });
  // This starts the server and listens on the respected port address
  app.listen({ port: 3069 }, () => {
    console.log(
      `The Apollo Server is running @ http://localhost:3069${server.graphqlPath}`
    );
  });
};
// Starting the Express Server with the Mongoose Database
startServer().catch((error) => console.log(error));
