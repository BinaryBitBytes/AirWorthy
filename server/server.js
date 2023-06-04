import express, { urlencoded, json } from 'express';
import { fileURLToPath } from 'url';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
// import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import http from 'http';
import { ApolloServer } from 'apollo-server';
import { graphql, buildSchema } from "graphql"; // added 5.13.23 sourced from graphql docs
import pkg from "express-jwt";
const { expressjwt, ExpressJwtRequest, } = pkg;
import path, { join } from 'path';
import { authMiddleware } from './utils/middleware/auth.cjs';
import db from './config/connection.js';
import routes from './routes/index.js'; //!5.14.24 added /index.js to path
import { resolvers } from './src/typeDef-Resolvers/resolvers.js';
// import { typeDef as typeDefs } from './src/typeDef-Resolvers/typeDef.js';
import typeDefs from './src/typeDef-Resolvers/typeDef.js';

import { types } from "util";
import { application } from './src/typeDef-Resolvers/module/createApplication.js';
import { makeExecutableSchema } from '@graphql-tools/schema'
console.log(typeDefs)

// makeExecutableSchema({
//   typeDefs: typeDefs,//[Query, Airliner, Auth, Inspector, Manager, ProjectData, Project, Technician],
//   // resolvers: merge(resolvers, airlinerResolvers, authResolvers, inspectorResolvers, managerResolvers, projectDataResolvers, projectResolvers, technicianResolvers),
//   resolvers: resolvers,
// });

const schema = application.createApolloExecutor(typeDefs, resolvers);
const PORT = process.env.PORT || 3001;
const app = express(schema);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};
startApolloServer(typeDefs, resolvers);
