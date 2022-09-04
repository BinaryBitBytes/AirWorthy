const { gql } = require('graphql-tag');
//("apollo-server-express");
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const typeDefs = gql`
  type Mutation{
    AddAirliner(airlinerName: String!, isAdmin: Boolean!, modelAircraft:[Aircraft] ) : AddAirlinerData
    UpdateAirliner(_id: ID!, newAirliner: AddAirlinerData!) : AllAirliners!
    FindAirlinerToRemove(_id: ID!, deletedAirliner: AddAirlinerData) : AllAirliners!
    RemoveAirliner(airlinerID: ID!, deletedAirlinerName: FindAirliner) : AllAirliners!
  }
  type Query {
    AllAirlinersInSystem: [AllAirliners!]!
    FindAirliner: [AddAirlinerData!]!
  }
  input AddAirlinerData {
    _id: ID!
    airlinerName: String!
    modelAircraft: [Aircraft]
    AirlinerProfile: [AirlinerDetails!]!
  
  }
  input AirlinerDetails{
    isAdmin: Boolean!
    username: String!
    email: String!
    password: String!
  }
  input ProjectData {
    _id: ID!
    projectName: String
    inspectorName: String!
    workDescription: String
  }

  type Auth {
    token: ID!
    user: String
  }
  
  type AddAirlinerData {
      _id: ID!
      airlinerName: String!
      isAdmin: Boolean!
      modelAircraft: [Aircraft!]!
      username: String!
      email: String!
      password: String!
    }

  type FindAirliner {
    _id: ID!
    ariliner: [AddAirlinerData!]!
  }

  type AllAirliners {
    _id: ID!
    airliner: [FindAirliner!]!
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
    theAircrafts: [Aircraft!]!
  }
  input Aircraft{
    _id: ID!
    aircraftName: String
    aircraftData: [AircraftDataDetails!]!
  }
  input AircraftDataDetails{
    _id: ID!
    aircraft: [Aircraft!]!
    specificity: Int!
    modelNumber: Int!
    airliner: [AllAirliners!]!
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

  type Project {
    _id: ID!
    project: ProjectData
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


  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
