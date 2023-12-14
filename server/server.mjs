import * as apollo from "apollo-server-core";
import express from "express";
import buildSubgraphSchema from "@apollo/subgraph";
import * as StartStandaloneServer from "@apollo/server/standalone";
import resolvers from "./src/typeDef-Resolvers/Resolvers/resolvers.mjs";
import typeDefs from "./src/typeDef-Resolvers/Schema/typeDef.mjs";
import { connectDB } from "./config/connection.mjs";

// const { startStandaloneServer } = StartStandaloneServer;
const startStandaloneServer = () => {
  return StartStandaloneServer;
};
const BuildSubgraphSchema = () => {
  return buildSubgraphSchema;
};
const ApolloServer = () => {
  return apollo;
};
console.log(ApolloServer);
console.log(typeof ApolloServer);

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
    const apolloServer = ApolloServer({
      schema: BuildSubgraphSchema({
        // typeDefs: DocumentNode[typeDefs],
        typeDefs: typeDefs,
        resolvers,
      }),
    });

    return apolloServer;

    // await new apolloServer.listen({ port: 3069 });
    // await apolloServer.listen({ port: 3069 });
  };
  console.log(server.apolloServer);

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

/* --------------------------------
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
  // import typeDefs from './src/typeDef-Resolvers/Schema/typeDef.mjs'
  // import { data } from "jquery";
  // import { prototype } from "events";
  // import { sample } from "lodash";
  */
