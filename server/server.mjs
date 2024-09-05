// import * as apollo from "apollo-server-core";
import * as apollo from "apollo-server-express";
import * as apolloServer from "apollo-server-express/dist/index.js";
// !import * as apolloServerExprress from "apollo-server-express";
import * as express from "express";
// @ts //? TS package.
import * as _APOLLO_STANDALONE_ from "@apollo/server/standalone";
//--~\\/>//? END

import * as _APOLLO_SUBGRAPH_ from "@apollo/subgraph";
import resolvers from "./src/typeDef-Resolvers/Resolvers/resolvers.mjs";
import _TYPEDEFS_ from "./src/typeDef-Resolvers/Schema/typeDef.mjs";
import { connectDB } from "./config/connection.mjs";

console.log(`Type Defs Below: : __________________
  ` + _TYPEDEFS_);

// const ApolloServerExpress = () => {
//   return apolloServerExpress;
// };

const Express = async () => {
  return new { express }(); //? added await to the return value 4.22.2024
};
const StartStandaloneServer = async () => {
  return _APOLLO_STANDALONE_.startStandaloneServer(); //? added await to the return value 4.22.2024
};
console.log(StartStandaloneServer);
const BuildSubgraphSchema = async () => {
  return _APOLLO_SUBGRAPH_.buildSubgraphSchema; //? added await to the return value 4.22.2024
};
const ApolloServer = async () => {
  return { apollo }; //? added await to the return value 4.22.2024
};
console.log(ApolloServer);
console.log(typeof ApolloServer);
// const { startStandaloneServer } = StartStandaloneServer;
// connecting to the mongo database
// Global function to start the server asynchronously
const app = Express;
// This creates the instance of the Apollo server with the typeDefs & resolvers
const _APOLLOSERVER_ = ApolloServer({
  schema: BuildSubgraphSchema({
    // typeDefs: DocumentNode[typeDefs],
    _TYPEDEFS_: _TYPEDEFS_,
    resolvers,
  }),
});
console.log(_APOLLOSERVER_);

console.warn(`Server start has been initiated`);
const startServer = async () => {
  /* //! const resolvers = await import ('./src/typeDef-Resolvers/Resolvers/resolvers.mjs')
  ☺/ This creates an Express application
  / // express = await express('express')
  */
  // app.use(Express);
  app.get("/", (req, res, next) => {
    res.send(200 && console.log(`Route: app.get(res.send(200) Under Start Server has initiated`))
    req.receive;
    next();
  };
  app.listen({ port: 3069 }, () => {
    console.log(
      `The Apollo Server is running @ http://localhost:3069${server.graphqlPath}`
      // `The Apollo Server is running @ http://localhost:3069${server.apply}`
    );
  });
  // };
  app.listen(3000);
};

// This starts the server and listens on the respected port address
console.log(`Listening on 3000 START`);
console.log(`Listening on 3000 END STARTING PHASE`);
/*//////////////////////////////////////////////////*/
/*//////////////////////////////////////////////////*/
async function server() {
  let RUN = await ApolloServer.apply({
    schema: BuildSubgraphSchema({ _TYPEDEFS_, resolvers }),
  });

  const RUNNING = { RUN };
  return RUNNING; //? added await to the return value 4.22.2024

  // await new apolloServer.listen({ port: 3069 });
  // await apolloServer.listen({ port: 3069 });
}
/*//////////////////////////////////////////////////*/
console.log(server.apolloServer);
// await server();
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
//! server.applyMiddleware({ app });

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
