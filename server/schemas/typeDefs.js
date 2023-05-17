import { gql } from "apollo-server-express";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// const typeDefs = gql`
const typeDefs = `#graphql
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

  type projectData {
    projectName: String
    inspectorName: String
    workDescription: String
    projectId: Int
  }

  type Query {
    airliners(): [Airliner]
    airliner(airliner_id:ID!):Airliner
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: {},
});

export default typeDefs;
