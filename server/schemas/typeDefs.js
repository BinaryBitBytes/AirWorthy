const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Technician {
    _id: ID!
    technicianName: String
    isAdmin: Boolean
    onProject: [Project]
    username: String!
    email: String
    password: String
  }

  type Airliner {
    _id: ID!
    airlinerName: String
    isAdmin: Boolean
    modelAircraft: [String]
    username: String!
    email: String
    password: String
  }

  type Manager {
    _id: ID!
    managerName: String
    isAdmin: Boolean
    onProject: [Project]
    username: String!
    email: String
    password: String
  }

  type Inspector {
    _id: ID!
    inspectorName: String
    isAdmin: Boolean
    onProject: [Project]
    username: String!
    email: String
    password: String
  }

  type Project {
    _id: ID!
    projectName: String
    inspectorName: String
    workDescription: String
  }

  type Auth {
    token: ID!
    user: String
  }

  input projectData {
    projectName: String
    inspectorName: String
    workDescription: String
    projectId: Int
  }

  type Query {
    airliners(): [Airliner]
    airliner(airlinerID:ID!):Airliner
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
