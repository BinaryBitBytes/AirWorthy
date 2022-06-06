const { gql } = require('apollo-server-express');
const mongoose = require("mongoose");
const technicianSchema = require("");
const managerSchema = require("");
const projectSchema = require("");
const arilinerSchema = require("");
const inspectorSchema = require("");


const typeDefs = gql`
  type Technician {
    _id: ID!
    technicianName: [technicianName]
    isAdmin: Boolean
    onProject: [Project]
    username: String!
    email: String
    password: String
  }

  type Manager {
    _id: ID!
    managerName: [managerName]
    isAdmin: Boolean
    onProject: [Project]
    username: String!
    email: String
    password: String
  }

  type Project {
    _id: ID!
    projectName: [projectName]
    inspectorName: [inspectorName]
    workDescription: String
    
  }

   type Auth {
    token: ID!
    user: User
  }

  input BookData {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
}

  type Query {
    me(userId: ID!): User
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(userId: ID!, bookData: BookData): User
    removeBook(userId: ID!, bookId: ID!): User
  }
`;

module.exports = typeDefs;
