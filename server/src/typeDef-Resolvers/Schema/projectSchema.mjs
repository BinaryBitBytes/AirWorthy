// import gql from 'apollo-server'
// import gql  from 'gql-tag'
// const { gql } = gql
// import { gql } from '../../../node_modules/apollo-server/src/exports.ts'
// import { makeExecutableSchema } from '@graphql-tools/schema'
// import { gql } from'apollo-server-core'
import gql from "../../gql.mjs";

// export const ProjectTypeDefs = gql`
//TODO need to add a real input type to project named projectInput and change project back to type project
const ProjectTypeDefs = gql`
  interface Project {
    _id: ID!
    projectName: String
    isAdmin: Boolean
    onProject: [String]
    username: String
    email: String
    password: String
  }

  type ProjectInput implements Project {
    projectName: String
    isAdmin: Boolean
    onProject: [String]
    username: String
    email: String
    password: String
  }

  type Query implements Project {
    projects: [Project]
    project(projectID: ID!): Project
  }

  type Mutation implements Project {
    addProject(input: ProjectInput): Project
    updateProject(projectID: ID!, onProject: [String]): Project
    removeProject(projectID: ID!): Project
    removeTechnician(projectID: ID!, technicianID: String): Project
  }
`;

export { ProjectTypeDefs };
console.log({ ProjectTypeDefs });
