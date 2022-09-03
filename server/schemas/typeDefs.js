const { gql } = require('graphql-tag');
//("apollo-server-express");
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const typeDefs = gql`
  input AddAirlinerData {
    _id: Int!
    airlinerName: String!
    isAdmin: Boolean!
    modelAircraft: [Aircraft]
    username: String!
    email: String!
    password: String!
  }
  type addAirliner {
    _id: Int!
    airlinerName: String!
    isAdmin: Boolean!
    modelAircraft: [Aircraft]
    username: String!
    email: String!
    password: String!
  }

  type AllAirliners {
    Airliner: [addAirliner]
  }

  type Technician {
    _id: ID!
    technicianName: String
    isAdmin: Boolean
    onProject: [Project]
    username: String!
    email: String
    password: String
  }
  
  type Aircraft{
    _id: ID!
    aircraftName: String
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

  input ProjectData {
    projectName: String
    inspectorName: String
    workDescription: String
    Project_id: Int
  }

  type Query {
    airliners: [AllAirliners]
    airliner(airliner_id:ID!):[addAirliner]
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
