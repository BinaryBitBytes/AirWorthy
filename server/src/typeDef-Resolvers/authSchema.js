import { makeExecutableSchema } from "@graphql-tools/schema";
import pkg from "apollo-server-express";
const { gql } = pkg;
// import {gql} from 'graphql-tag';
import { printSchema } from "graphql";
import { error } from "console";
// import {authSchema as User} from '../models/Auth.js'
export const resolvers = {
  Auth: {
    Query: {
      //TODO: adding User
      user: async (parent, { _id }) => {
        return Auth.findOne({ _id: userID }).populate("user");
      },
      // //TODO: creating User
      //TODO: logging in User
      // loginUser: async (parent, { userID, username }) => {
      //   return Auth.findOne({ username: username }).populate("auth");
      // },
      users: async (parent, { username }) => {
        return Auth.find().sort({ createdAt: -1 }).populate("user"); //! added await
      },
    },
    
    Mutation: {
      addUser: async (parent, 
        { token, user, username, email, password, isAdmin }
        ) => {
          const newAuth = new Auth({ token, user, username, email, password, isAdmin });
          await newAuth.build({ user, username, email, password, isAdmin });
          await newAuth.save();
          await newAuth.populate("user");
          //Todo: Needs return fn <-------
          return newAuth;
      },
      addUser: async (parent, { userID, username, email, password }) => {
        return username.findOneAndUpdate( //Todo: need to verify the parent value of userID <------ 
        //! ^^^^
          { _id: userID },
          {
            $addToSet: { username: {username}, email: { email }, password: {password} },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      },
      loginUser: async (parent, { userID, username, email, password }) => {
        const userLogin = new user.findOne({ userID, username, email, password });
        await userLogin.build(username, email, password);
        await userLogin.save();
        await userLogin.populate("Auth");
      },
      //TODO: updating user
      //TODO: removing User
    },
  },
};
console.log(resolvers.Auth.Query.user)
export const typeDefs = gql`
  type Auth {
    _id: ID!
    token: ID
    userID: ID
    user: String
    username: String
    email: String
    password: String
    isAdmin: Boolean
  }
  type Query {
    user(userID: ID!): Auth,
    users(userID: ID!): [Auth]
  }
  type User {
    _id: ID
    userID: ID
    user: String
    username: String
    email: String
    password: String
    isAdmin: Boolean
  }
  type Mutation {
    addUser(token:ID, user: String, username: String, email: String, password: String, isAdmin: Boolean): Auth
    loginUser(userID: ID, username: String, email: String, password: String): Auth
    # updateUser(_id: ID!, username: String!, email: String, password: String!): Auth
    # removeUser: Auth
  }
  type addUser {
    userID: ID!,
    username: String, 
    email: String, 
    password: String, 
    isAdmin: Boolean
  }
`;
console.log(`"typeDefs"`);
console.log(typeDefs.definitions);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
console.log(`"schema"`);
console.log(schema);
const rootResolveFunction = (parent, args, context, info) => {
};
addSchemaLevelResolveFunction(schema, rootResolveFunction);