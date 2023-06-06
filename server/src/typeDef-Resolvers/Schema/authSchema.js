import { makeExecutableSchema } from "@graphql-tools/schema";
import pkg from "apollo-server-express";
const { gql } = pkg;
// import {gql} from 'graphql-tag';
import { printSchema } from "graphql";

//TODO: adding User
// //TODO: creating User
//TODO: logging in User
// loginUser: async (parent, { userID, username }) => {
//   return Auth.findOne({ username: username }).populate("auth");
// },
  export const AuthTypeDefs = gql`
    type Query {
      auth(authID: ID!): Auth,
      # auths(authID: ID!, username:String): [Auth]
      auths(authID: ID!): [Auth]
    }
    # //TODO need to add a real input type to auth named authInput and change auth back to type Auth
    input Auth {
      _id: ID!
      username: String
      token: String
      email: String
      password: String
      isAdmin: Boolean
    }
    # Type of Query for Auth
    # Type of User for Auth
    type User {
      _id: ID
      token: String
      username: String
      email: String
      password: String
      isAdmin: Boolean
    }
    type Mutation {
      addUser(_username: String, token:String, email: String, password: String, isAdmin: Boolean): Auth
      loginUser( username: String, token:String, email: String, password: String): Auth
      # updateUser(_id: ID!, username: String!, email: String, password: String!): Auth
      # removeUser: Auth
    }
    # Type of addUser for Auth
    type auth {
      _id: ID!,
      username: String, 
      token: String,
      email: String, 
      password: String, 
      isAdmin: Boolean
    }
    type auths {
      _id: ID!,
      username: String, 
      token: String,
      email: String, 
      password: String, 
      isAdmin: Boolean
    }
  `;