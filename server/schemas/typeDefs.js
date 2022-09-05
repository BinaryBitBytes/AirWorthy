const { gql } = require('graphql-tag');
//("apollo-server-express");
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const typeDefs = gql`
  type Mutation{
    AddAirliner(_id: ID!, airlinerName: String!, isAdmin: Boolean!, modelAircraft: AddAirlinerData ) : InputAirlinerData
    UpdateAirliner(_id: ID!, AirlinerName: String!) : AllAirliners!
    FindAirlinerToRemove(_id: ID!, airlinerName: String!) : AllAirliners!
    RemoveAirliner(airlinerID: ID!, airlinerName: String!) : AllAirliners!
  }
  type Query {
    AllAirlinersInSystem: [AllAirliners!]!
    FindAirliner: [Aircraft!]!
  }
  type FindAirliner {
    _id: ID!
    ariliner: [InputAirlinerData!]!
  }
  type AllAirliners {
    _id: ID!
    airliner: [FindAirliner!]!
  }
  type TheAirliner {
    _id: ID!
    airlinerData: [NewAircraft!]!
  }
  type InputAirlinerData {
      _id: ID!
      airlinerName: String!
      isAdmin: Boolean!
      modelAircraft: [Aircraft!]!
      username: String!
      email: String!
      password: String!
    }
  type Aircraft{
    _id: ID!
    aircraftList: [TheNewAircrafts]!
  }
  type TheNewAircrafts{
    _id: ID!
    theAircrafts: [NewAircraft!]!
  }
  type NewAircraft{
    _id: ID!
    aircraftName: String
  }
  input AircraftDataDetails{
    _id: ID!
    specificity: Int!
    modelAircraft: Int!
    airliner: [AddAirlinerData!]!
  }
  input AddAirlinerData {
    _id: ID!
    airlinerName: String!
    modelAircraft: [AircraftDataDetails]
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
  

  type Technician {
    _id: ID!
    technicianName: String
    isAdmin: Boolean
    onProject: [Project]
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

  type Project {
    _id: ID!
    project: [ProjectDataInput]
  }
  type ProjectDataInput{
    _id: ID!
    description: String!
    techs: [Technician]
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
