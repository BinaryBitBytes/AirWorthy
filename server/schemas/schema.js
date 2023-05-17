import { typeDef as Airliner } from './airlinerSchema';
import { typeDef as Auth } from './authSchema';
import { typeDef as Inspector } from './inspectorSchema';
import { typeDef as Manager } from './managerSchema';
import { typeDef as ProjectData } from './projectDataSchema';
import { typeDef as Project } from './projectSchema';
import { typeDef as Technician } from './technicianSchema';

const Query = `

` ; 
//! EXAMPLE---- BELOW
// const Query = `
//   type Query {
//     author(id: Int!): Post
//     book(id: Int!): Post
//   }
// `;

makeExecutableSchema({
    typeDefs: [ Query, Airliner, Auth, Inspector, Manager, ProjectData, Project, Technician],
    resolvers: {},
  });