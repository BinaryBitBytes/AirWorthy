import pkg from 'lodash';
const { ApolloServer, gql } = require('apollo-server');
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as Airliner, resolvers as airlinerResolvers } from './airlinerSchema';
import { typeDef as Auth, resolvers as authResolvers } from './authSchema';
import { typeDef as Inspector, resolvers as inspectorResolvers } from './inspectorSchema';
import { typeDef as Manager, resolvers as managerResolvers } from './managerSchema';
import { typeDef as ProjectData, resolvers as projectDataResolvers } from './projectDataSchema';
import { typeDef as Project, resolvers as projectResolvers } from './projectSchema';
import { typeDef as Technician, resolvers as technicianResolvers } from './technicianSchema';
const { merge } = pkg;
const Query = gql`
  type Query {
    _empty: String
  }
  
  extend type Query {
    airliner(id: Int!): Airliner 
  }
  
  extend type Query {
    auth(id: Int!): Auth 
  }

  extend type Query {
    instpector(id: Int!): Inspector 
  }
  
  extend type Query {
    manager(id: Int!): Manager 
  }

  extend type Query {
    projectData(id: Int!): ProjectData 
  }
  
  extend type Query {
    project(id: Int!): Project 
  }

  extend type Query {
    technician(id: Int!): Technician 
  }
`;
console.log(typeDef);

const resolvers = {
  Query: {
  }
};
console.log(resolvers)
// makeExecutableSchema({
//   typeDefs: [ Query, Author, Book ],
//   resolvers: merge(resolvers, authorResolvers, bookResolvers),
// });
//!-------------^^^^^^^--------------------!!

makeExecutableSchema({
  typeDefs: [Query, Airliner, Auth, Inspector, Manager, ProjectData, Project, Technician],
  resolvers: merge(resolvers, airlinerResolvers, authResolvers, inspectorResolvers, managerResolvers, projectDataResolvers, projectResolvers, technicianResolvers),
});

const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
};
addSchemaLevelResolveFunction(schema, rootResolveFunction)
console.log(makeExecutableSchema);