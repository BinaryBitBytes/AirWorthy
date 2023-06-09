// import pkg from 'apollo-server-express'
// import { makeExecutableSchema } from '@graphql-tools/schema'
// // import { error } from "console"
// const { gql } = pkg
// // import {authSchema as User} from '../models/Auth.js'
// export const resolvers = {
//   Auth: {
//     Query: {
//       // //TODO: creating User
//       // user: async (paremt, {_id}) => {
//       //   return User.findOne({_id: userID})
//       //   .populate("")
//       //   .populate()
//       //   .populate()
//       // },
//       // TODO: adding User
//       addUser: async (parent, { _id }) => {
//         return Auth.findOne({ _id: userID }).populate("auth");
//       },
//       // //TODO: creating User
//       // allUsers: async() => {
//       //   return await useResolvedPath.find({})
//       //   .populate("")
//       //   .populate("")
//       //   .populate({
//       //     path: "",
//       //     populate: ""
//       //   })
//       //   .populate({
//       //     path: "",
//       //     populate: ""
//       //   })
//       // },

//       // TODO: logging in User
//       loginUser: async (parent, { userID, username }) => {
//         return Auth.findOne({ username: username }).populate(
//           'auth'
//         )
//       }
//       // addUser: (parent, { userID }) => {
//       //   return User.findOne({
//       //     $or: [{ _id: userID }, { username: username }],
//       //   }).populate("me");
//       // },

//       // loginUser: (parent, { userID }) => {
//       //   return User.findOne({
//       //     $or: [{ _id: userID }, { username: username }],
//       //   }).populate("me");
//       // },
//     },

//     Mutation: {
//       addUser: async (parent,
//         { username, email, password, isAdmin }
//       ) => {
//         const newAuth = new Auth({ username, email, password, isAdmin })
//         await newAuth.build({ username, email, password })
//         await newAuth.save()
//         await newAuth.populate('Auth')

//         // if (!newAuth) {
//         //   return res.status(400).json({ message: "Something is wrong!" });
//         // }
//         // const token = signToken(newAuth);
//         // return { token, newAuth };
//       },
//       addUser: async (parent, { userID, email, password }) => {
//         return userID.findOneAndUpdate(
//           { _id: userID },
//           {
//             $addToSet: { email: { email }, password: {password} },
//           },
//           {
//             new: true,
//             runValidators: true
//           }
//         )
//       },
//       loginUser: async (parent, { username, email, password }) => {
//         const userLogin = new user.findOne({ username, email, password });
//         // const user = await User.findOne({ email });
//         await userLogin.build(username, email, password)
//         await userLogin.save()
//         await userLogin.populate('Auth')
//         // if (!user) {
//         //   throw new AuthenticationError(
//         //     "Cannot find this user with this email address."
//         //   );
//         // }

//         // const correctPw = await user.isCorrectPassword(password);

//         // if (!correctPw) {
//         //   throw new AuthenticationError("Wrong password!");
//         // }
//         // const token = signToken(user);
//         // return { token, user };
//       }

//       // TODO: updating user
//       // updateUser: async (parent, args, context) => {
//       //   if (context.user) {
//       //     return User.findOneAndUpdate(
//       //       { _id: args._id },
//       //       {
//       //         $set: {
//       //           username: args.username,
//       //           email: args.email,
//       //           password: args.password,
//       //         },
//       //       },
//       //       { returnDocument: "after" }
//       //     );
//       //   }
//       //   throw new AuthenticationError(`You need to be logged in!`);
//       // },
//       // TODO: removing User
//       // removeUser: async (parent, args, context) => {
//       //   if (context.user) {
//       //     return User.findOneAndDelete({ _id: context.user._id });
//       //   }
//       //   throw new AuthenticationError(`You need to be logged in!`);
//       // },
//     }
//   }
// }

// export const typeDefs = gql`
//   type Auth {
//     _id: ID!
//     token: ID! #should i use {uuid} or a JSWT for this datatype?
//     userID: ID!
//     user: String
//     username: String!
//     email: String!
//     password: String!
//     # User: User
//     isAdmin: Boolean!
//   }

//   # type User {
//   #   _id: ID!
//   #   userID: ID! # changed user to userId
//   #   username: String!
//   #   email: String!
//   #   password: String!
//   # }
//   type addUser {
//     userID: ID!,
//     username: String,
//     email: String,
//     password: String!,
//     isAdmin: Boolean
//   }
//   type Query {
//     addUser(userID: ID!): Auth,
//     loginUser(username: String!): [addUser]
//   }

//   type Mutation {
//     addUser(username: String!, email: String,password: String!): Auth

//     loginUser(username: String!, email: String, password: String!): Auth

//     updateUser(
//       _id: ID!,
//       username: String!,
//       email: String,
//       password: String!
//     ): Auth
//     removeUser: Auth
//   }
// `

// // console.log(`"typeDefs"`);
// // console.log(typeDefs.definitions);

// // const schema = makeExecutableSchema({
// //   typeDefs,
// //   resolvers
// //   // resolverValidationOptions: {
// //   //   requireResolversForResolveType: true,
// //   // }
// // }
// // )

// // console.log(`"schema"`);
// // console.log(schema);

// // const rootResolveFunction = (parent, args, context, info) => {
// // perform action before any other resolvers
// // }
// // console.log(rootResolveFunction);

// // // addSchemaLevelResolveFunction(schema, rootResolveFunction);

// // console.log(`"addSchemaLevelResolveFunction"`)
// // console.log(addSchemaLevelResolveFunction);
