const { ApolloServer, gql } = require('apollo-server');

export const typeDef = `
type projectData {
    projectName: String
    inspectorName: String
    workDescription: String
    projectId: Int
  }
` ;

export const resolvers =gql `
  type Project_Data:{
    
  }`;

// module.exports = {typeDef, resolvers}