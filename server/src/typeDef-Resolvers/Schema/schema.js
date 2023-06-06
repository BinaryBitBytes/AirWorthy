import pkg from 'lodash';
import { ApolloServer, gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers as airlinerResolvers } from './airlinerSchema.js';
import { resolvers as authResolvers } from './authSchema.js';
import {  resolvers as inspectorResolvers } from './inspectorSchema.js';
import {  resolvers as managerResolvers } from './managerSchema.js';
import {  resolvers as projectDataResolvers } from './projectDataSchema.js';
import {  resolvers as projectResolvers } from './projectSchema.js';
import {  resolvers as technicianResolvers } from './technicianSchema.js';
import { typeDefs } from '../Schema/typeDef.js'
// import { typeDefs as Airliner, resolvers as airlinerResolvers } from './airlinerSchema.js';
// import { typeDefs as Auth, resolvers as authResolvers } from './authSchema.js';
// import { typeDefs as Inspector, resolvers as inspectorResolvers } from './inspectorSchema.js';
// import { typeDefs as Manager, resolvers as managerResolvers } from './managerSchema.js';
// import { typeDefs as ProjectData, resolvers as projectDataResolvers } from './projectDataSchema.js';
// import { typeDefs as Project, resolvers as projectResolvers } from './projectSchema.js';
// import { typeDefs as Technician, resolvers as technicianResolvers } from './technicianSchema.js';

const { merge } = pkg;
// const Query = gql`
//   type Query {
//     _empty: String
//   }
  
//   extend type Query {
//     airliner(id: Int!): Airliner 
//   }
  
//   extend type Query {
//     auth(id: Int!): Auth 
//   }

//   extend type Query {
//     instpector(id: Int!): Inspector 
//   }
  
//   extend type Query {
//     manager(id: Int!): Manager 
//   }

//   extend type Query {
//     projectData(id: Int!): ProjectData 
//   }
  
//   extend type Query {
//     project(id: Int!): Project 
//   }

//   extend type Query {
//     technician(id: Int!): Technician 
//   }
// `;

const resolvers = {
  Query: {
  }
};

// makeExecutableSchema({
//   typeDefs: [ Query, Author, Book ],
//   resolvers: merge(resolvers, authorResolvers, bookResolvers),
// });
//!-------------^^^^^^^--------------------!!

const SCHEMAex = () => { 
  makeExecutableSchema({
    // typeDefs: [Query, Airliner, Auth, Inspector, Manager, ProjectData, Project, Technician],
    // typeDefs: [Airliner, Auth, Inspector, Manager, ProjectData, Project, Technician],
      typeDefs: typeDefs,
    // resolvers: merge(resolvers, airlinerResolvers, authResolvers, inspectorResolvers, managerResolvers, projectDataResolvers, projectResolvers, technicianResolvers),
    resolvers: merge(airlinerResolvers, authResolvers, inspectorResolvers, managerResolvers, projectDataResolvers, projectResolvers, technicianResolvers),

  });
}
export default SCHEMAex;
const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
};
//! addSchemaLevelResolveFunction(schema, rootResolveFunction)
// console.log(makeExecutableSchema);