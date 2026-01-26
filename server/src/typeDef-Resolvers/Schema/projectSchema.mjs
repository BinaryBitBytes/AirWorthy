// src/typeDef-Resolvers/Schema/typeDef.mjs
// import { gql } from "graphql-tag";
import gql from "../../gql.mjs";

const typeDefs = gql`
  type Project {
    _id: ID!
    projectName: String
    isAdmin: Boolean
    onProject: [String!]
    username: String
    email: String
    password: String
  }

  input ProjectInput {
    projectName: String!
    isAdmin: Boolean
    onProject: [String!]
    username: String
    email: String
    password: String
  }

  type Query {
    projects: Project!
    project(projectID: ID!): Project
  }

  type Mutation {
    addProject(input: ProjectInput!): Project
    updateProject(projectID: ID!, input: ProjectInput!): Project
    removeProject(projectID: ID!): Project
    removeTechnician(projectID: ID!, technicianID: String!): Project
  }
`;
const ProjectTypeDefs = typeDefs;
console.error(ProjectTypeDefs);
export default ProjectTypeDefs;

// # """
// # Concrete Project type implementing the Project interface
// # """ # type Project { #   _id: ID! #   projectName: String
// # input #   isAdmin: Boolean
// #   onProject: [String!]
// #   username: String
// #   email: String
// #   password: String
// # }
// # input Project {
// #   projects: [Project]
// #   project(projectID: ID!): Project
// # }
// # """
// # Input type for creating/updating projects
// # """
