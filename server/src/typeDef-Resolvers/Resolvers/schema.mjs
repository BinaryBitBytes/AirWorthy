import { ApolloServer } from "apollo-server";
// import { gql } from '../../../node_modules/apollo-server/src/exports.ts'
// import { gql } from'apollo-server-core'
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as merge from "lodash";
// import { gql } from '../../../gql.mjs'
// import gql from 'gql-tag'

// Import resolvers from schema files
import { authResolver as authResolvers } from "./authResolver.mjs";
import { airlinerResolver as airlinerResolvers } from "./airlinerResolver.mjs";
import { inspectorResolver as inspectorResolvers } from "./inspectorResolver.mjs";
import { managerResolver as managerResolvers } from "./managerResolver.mjs";
import { projectDataResolver as projectDataResolvers } from "./projectDataResolver.mjs";
import { projectResolver as projectResolvers } from "./projectResolver.mjs";
import { technicianResolver as technicianResolvers } from "./technicianResolver.mjs";
import { makeExecutableSchema as EXECUTABLE_SCHEMA } from "@graphql-tools/schema";

const execSchema = { EXECUTABLE_SCHEMA };
console.log(execSchema);
console.log(airlinerResolvers);

// Define the root resolvers
const rootResolvers = {
  Query: {},
};

// Define the executable schema
export const SCHEMA = () => {
  return EXECUTABLE_SCHEMA({
    typeDefs: [
      Airliner,
      Auth,
      Inspector,
      Manager,
      ProjectData,
      Project,
      Technician,
    ], // Add the correct typeDefs here
    resolvers: merge(
      rootResolvers,
      airlinerResolvers,
      authResolvers,
      inspectorResolvers,
      managerResolvers,
      projectDataResolvers,
      projectResolvers,
      technicianResolvers
    ),
  });
};

// Create an Apollo Server instance
const server = new ApolloServer({
  schema,
  // ... other Apollo Server options if needed
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});

// import pkg from 'lodash';
// import { ApolloServer, gql } from 'apollo-server';
// import { makeExecutableSchema } from '@graphql-tools/schema';
// import { resolvers as airlinerResolvers } from './airlinerSchema.js';
// import { resolvers as authResolvers } from './authSchema.js';
// import { resolvers as inspectorResolvers } from './inspectorSchema.js';
// import { resolvers as managerResolvers } from './managerSchema.js';
// import { resolvers as projectDataResolvers } from './projectDataSchema.js';
// import { resolvers as projectResolvers } from './projectSchema.js';
// import { resolvers as technicianResolvers } from './technicianSchema.js';
// const { merge } = pkg;
// const resolvers = {
//   Query: {
//   }
// };

// const SCHEMAex = () => {
//   makeExecutableSchema({
//     // typeDefs: [Query, Airliner, Auth, Inspector, Manager, ProjectData, Project, Technician],
//     typeDefs: [Airliner, Auth, Inspector, Manager, ProjectData, Project, Technician],
//     // resolvers: merge(resolvers, airlinerResolvers, authResolvers, inspectorResolvers, managerResolvers, projectDataResolvers, projectResolvers, technicianResolvers),
//     resolvers: merge(airlinerResolvers, authResolvers, inspectorResolvers, managerResolvers, projectDataResolvers, projectResolvers, technicianResolvers),

//   });
// }
// const rootResolveFunction = (parent, args, context, info) => {
//   //perform action before any other resolvers
// };
