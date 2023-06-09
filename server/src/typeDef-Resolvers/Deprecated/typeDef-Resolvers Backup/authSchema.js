// import { makeExecutableSchema } from "@graphql-tools/schema";
// import pkg from "apollo-server-express";
// const { gql } = pkg;
// // import {gql} from 'graphql-tag';
// import { printSchema } from "graphql";
// import { error } from "console";
// // import {authSchema } from '../models/Auth.js'

// //TODO: adding User
// // //TODO: creating User
// //TODO: logging in User
// // loginUser: async (parent, { userID, username }) => {
// //   return Auth.findOne({ username: username }).populate("auth");
// // },
//   export const typeDefs = gql`
//     type Query {
//       auth(authID: ID!): Auth,
//       # auths(authID: ID!, username:String): [Auth]
//       auths(authID: ID!): [Auth]
//     }
//     # //TODO need to add a real input type to auth named authInput and change auth back to type Auth
//     input Auth {
//       _id: ID!
//       username: String
//       token: String
//       email: String
//       password: String
//       isAdmin: Boolean
//     }
//     # Type of Query for Auth
//     # Type of User for Auth
//     type User {
//       _id: ID
//       token: String
//       username: String
//       email: String
//       password: String
//       isAdmin: Boolean
//     }
//     type Mutation {
//       addUser(_username: String, token:String, email: String, password: String, isAdmin: Boolean): Auth
//       loginUser( username: String, token:String, email: String, password: String): Auth
//       # updateUser(_id: ID!, username: String!, email: String, password: String!): Auth
//       # removeUser: Auth
//     }
//     # Type of addUser for Auth
//     type auth {
//       _id: ID!,
//       username: String,
//       token: String,
//       email: String,
//       password: String,
//       isAdmin: Boolean
//     }
//     type auths {
//       _id: ID!,
//       username: String,
//       token: String,
//       email: String,
//       password: String,
//       isAdmin: Boolean
//     }
//   `;
// export const resolvers = {
//   Auth: {
//     Query: {
//       auth: async (parent, { _id }) => {
//         return Auth.findOne({ _id: authID } ).populate("auth");
//       },
//       auths: async (parent, { username }) => {
//         return Auth.find().sort({ createdAt: -1 }).populate("auth"); //! added await
//       },
//     },
//     Mutation: {
//       addUser: async (parent,
//         { username, token, email, password, isAdmin }
//         ) => {
//           const newAuth = new Auth({ username, token, email, password, isAdmin });
//           await newAuth.build(username, token, email, password );
//           await newAuth.save();
//           await newAuth.populate("auth");
//           //Todo: Needs return fn <-------
//           // return newAuth;
//       },
//       addUser: async (parent, { authID, username, email, password }) => {
//         return authID.findOneAndUpdate( //Todo: need to verify the parent value of userID <------
//         //! ^^^^
//           { _id: authID },
//           {
//             $addToSet: { username: {username}, email: { email }, password: {password} },
//           },
//           {
//             new: true,
//             runValidators: true,
//           }
//         );
//       },
//       loginUser: async (parent, { username, token, email, password }) => {
//         const userLogin = new Auth.findOne({ username, token, email, password });
//         await userLogin.build(username, email, password);
//         await userLogin.save();
//         await userLogin.populate("loginUser");
//       },
//       //TODO: updating user
//       //TODO: removing User
//     },
//   },
// };
// // console.log(`"typeDefs"`);
// // console.log(typeDefs.definitions);
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });
// // console.log(`"schema"`);
// // console.log(schema);
// const rootResolveFunction = (parent, args, context, info) => {
// };
// // addSchemaLevelResolveFunction(schema, rootResolveFunction);
