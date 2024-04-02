// import * as apollo from "apollo-server-core";
const APOLLO = apollo;
import * as apollo from "apollo-server-express";
// !import * as apolloServerExprress from "apollo-server-express";
import * as express from "express";
import * as startStandaloneServer from "@apollo/server/standalone";
import * as buildSubgraphSchema from "@apollo/subgraph";
import * as resolvers from "./src/typeDef-Resolvers/Resolvers/resolvers.mjs";
import * as typeDefs from "./src/typeDef-Resolvers/Schema/typeDef.mjs";
import { connectDB } from "./config/connection.mjs";
// const ApolloServerExpress = () => {
//   return apolloServerExpress;
// };

const Express = async () => {
  return { express }; //? added await to the return value 4.22.2024
};
const StartStandaloneServer = async () => {
  return { startStandaloneServer }; //? added await to the return value 4.22.2024
};
const BuildSubgraphSchema = async () => {
  return { buildSubgraphSchema }; //? added await to the return value 4.22.2024
};
const ApolloServer = async () => {
  return { apollo }; //? added await to the return value 4.22.2024
};
console.log(ApolloServer);
console.log(typeof ApolloServer);
// const { startStandaloneServer } = StartStandaloneServer;

// connecting to the mongo database
// Global function to start the server asynchronously
var app = Express;
// This creates the instance of the Apollo server with the typeDefs & resolvers
const apolloServer = ApolloServer({
  schema: BuildSubgraphSchema({
    // typeDefs: DocumentNode[typeDefs],
    typeDefs: typeDefs,
    resolvers,
  }),
});
console.log(apolloServer);

const startServer = async () => {
  /* //! const resolvers = await import ('./src/typeDef-Resolvers/Resolvers/resolvers.mjs')
  ☺/ This creates an Express application
  / // express = await express('express')
  */
  // app.use(Express);
  app.get("/", function (req, res, next) {
    next();
  });
  app.listen(3000);
};
console.log(`Listening on 3000 START`);
console.log(`Listening on 3000 END STARTING PHASE`);
/*//////////////////////////////////////////////////*/
/*//////////////////////////////////////////////////*/
const server = async () => {
  // new ApolloServer({
  //    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  // });

  return await new apolloServer(); //? added await to the return value 4.22.2024

  // await new apolloServer.listen({ port: 3069 });
  // await apolloServer.listen({ port: 3069 });
};
/*//////////////////////////////////////////////////*/
console.log(server.apolloServer);
server();
/*//////////////////////////////////////////////////*/
/*//////////////////////////////////////////////////*/
//! testing
const { url } = StartStandaloneServer(server);
console.log(`🚀  Server ready at ${url}`);
//!;
// await server.listen()

// This applies the Apollo Server Middleware into the Express application
// server.applyMiddleware({ app, ...rest });
server.applyMiddleware({ app });

// This starts the server and listens on the respected port address
app.listen({ port: 3069 }, () => {
  console.log(
    `The Apollo Server is running @ http://localhost:3069${server.graphqlPath}`
    // `The Apollo Server is running @ http://localhost:3069${server.apply}`
  );
});
// };

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

//
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
//
