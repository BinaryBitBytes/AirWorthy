import pkg from 'lodash';
import {gql} from 'graphql-tag';
import { typeDef as Airliner, resolvers as airlinerResolvers } from './airlinerSchema';
import { typeDef as Auth, resolvers as authResolvers } from './authSchema';
import { typeDef as Inspector, resolvers as inspectorResolvers } from './inspectorSchema';
import { typeDef as Manager, resolvers as managerResolvers } from './managerSchema';
import { typeDef as ProjectData, resolvers as projectDataResolvers } from './projectDataSchema';
import { typeDef as Project, resolvers as projectResolvers } from './projectSchema';
import { typeDef as Technician, resolvers as technicianResolvers } from './technicianSchema';
const { merge } = pkg;
// const Query = `

// ` ; 
//! EXAMPLE---- BELOW
// const Query = `
//   type Query {
//     author(id: Int!): Post
//     book(id: Int!): Post
//   }
// `;
//!---------------------------------!!
// import { 
//   typeDef as Author, 
//   resolvers as authorResolvers,
// } from './author.js';
// import { 
//   typeDef as Book, 
//   resolvers as bookResolvers,
// } from './book.js';

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

const resolvers = {
  Query: { 
  }
};
// makeExecutableSchema({
//   typeDefs: [ Query, Author, Book ],
//   resolvers: merge(resolvers, authorResolvers, bookResolvers),
// });
//!-------------^^^^^^^--------------------!!





makeExecutableSchema({
    typeDefs: [ Query, Airliner, Auth, Inspector, Manager, ProjectData, Project, Technician],
    resolvers: merge(resolvers, airlinerResolvers, authResolvers, inspectorResolvers, managerResolvers, projectDataResolvers, projectResolvers, technicianResolvers),
  });