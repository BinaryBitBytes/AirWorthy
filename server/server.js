// import express, { urlencoded, json } from 'express'
// import { fileURLToPath } from 'url';
// import { loadFilesSync } from '@graphql-tools/load-files'
// import { mergeTypeDefs } from '@graphql-tools/merge'
import { ApolloServer } from 'apollo-server-express'
// import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
// import http from 'http'
// import { ApolloServer } from 'apollo-server';
// import { graphql, buildSchema } from 'graphql' // added 5.13.23 sourced from graphql docs
// import pkg from 'express-jwt'
// import path, { join } from 'path'
// import { authMiddleware } from './utils/middleware/auth.cjs'
// import db from './config/connection.js'
// import routes from './routes/index.js' // !5.14.24 added /index.js to path
// import { resolvers as resolver } from './src/typeDef-Resolvers/Resolvers/resolvers.js';
import resolvers from './src/typeDef-Resolvers/Resolvers/resolvers.js'
// import { typeDef as typeDefs } from './src/typeDef-Resolvers/typeDef.js';
import typeDefs from './src/typeDef-Resolvers/Schema/typeDef.js'
// const resolvers = resolver;
// import { types } from "util";
// import { application } from './src/typeDef-Resolvers/module/createApplication.js';
// const typeDef = typeDefs;
// import { makeExecutableSchema } from '@graphql-tools/schema'
// const { expressjwt, ExpressJwtRequest, } = pkg
// makeExecutableSchema({
//   typeDefs: typeDefs,//[Query, Airliner, Auth, Inspector, Manager, ProjectData, Project, Technician],
//   // resolvers: merge(resolvers, airlinerResolvers, authResolvers, inspectorResolvers, managerResolvers, projectDataResolvers, projectResolvers, technicianResolvers),
//   resolvers: resolvers,
// });
for (const [typeName, typeResolvers] of Object.entries(resolvers)) {
  // Iterate over field resolvers for each type
  for (const [fieldName, fieldResolver] of Object.entries(typeResolvers)) {
    // Process each field resolver
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers
})

// // const SCHEMA = SCHEMAex
// // const schema = application.createApolloExecutor(typeDef, resolvers);
// // const PORT = process.env.PORT || 3001;
// // const app = express(schema);
// // app.use(express.urlencoded({ extended: false }));
// // app.use(express.json());

// // const startApolloServer = async (SCHEMAex) => {
// //   await server.start();
// //   server.applyMiddleware({ app });

// //   db.once('open', () => {
// //     app.listen(PORT, () => {
// //       console.log(`API server running on port ${PORT}!`);
// //       console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
// //     })
// //   })
// // };
// // startApolloServer(typeDefs, resolvers);
