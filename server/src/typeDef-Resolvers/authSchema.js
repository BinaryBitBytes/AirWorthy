import pkg from "apollo-server";
const { gql } = pkg;
import { makeExecutableSchema } from "@graphql-tools/schema";
// import {authSchema as User} from '../models/Auth.js'
export const resolvers = {
  Auth: {
    Query: {
      // //TODO: creating User
      // user: async (paremt, {_id}) => {
      //   return User.findOne({_id: userID})
      //   .populate("")
      //   .populate()
      //   .populate()
      // },
      //TODO: adding User
      addUser: async (parent, { _id }) => {
        return Auth.findOne({ _id: userID }).populate("auth");
      },
      // //TODO: creating User
      // allUsers: async() => {
      //   return await useResolvedPath.find({})
      //   .populate("")
      //   .populate("")
      //   .populate({
      //     path: "",
      //     populate: ""
      //   })
      //   .populate({
      //     path: "",
      //     populate: ""
      //   })
      // },

      //TODO: logging in User
      loginUser: async (parent, { userID, username }) => {
        return Auth.findOne({ _id: userID, username: username }).populate(
          "auth"
        );
      },
      // addUser: (parent, { userID }) => {
      //   return User.findOne({
      //     $or: [{ _id: userID }, { username: username }],
      //   }).populate("me");
      // },

      // loginUser: (parent, { userID }) => {
      //   return User.findOne({
      //     $or: [{ _id: userID }, { username: username }],
      //   }).populate("me");
      // },
    },

    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const newAuth = new Auth({ username, email, password });
        await newAuth.build({ username, email, password });
        await newAuth.save();
        await newAuth.populate("auth");

        // if (!newAuth) {
        //   return res.status(400).json({ message: "Something is wrong!" });
        // }
        // const token = signToken(newAuth);
        // return { token, newAuth };
      },
      loginUser: async (parent, { username, email, password }) => {
        const userLogin = new user.findOne({ username, email, password });
        // const user = await User.findOne({ email });
        await userLogin.build(username, email, password);
        await userLogin.save();
        await userLogin.populate("user");
        // if (!user) {
        //   throw new AuthenticationError(
        //     "Cannot find this user with this email address."
        //   );
        // }

        // const correctPw = await user.isCorrectPassword(password);

        // if (!correctPw) {
        //   throw new AuthenticationError("Wrong password!");
        // }
        // const token = signToken(user);
        // return { token, user };
      },
      //TODO: updating user
      // updateUser: async (parent, args, context) => {
      //   if (context.user) {
      //     return User.findOneAndUpdate(
      //       { _id: args._id },
      //       {
      //         $set: {
      //           username: args.username,
      //           email: args.email,
      //           password: args.password,
      //         },
      //       },
      //       { returnDocument: "after" }
      //     );
      //   }
      //   throw new AuthenticationError(`You need to be logged in!`);
      // },
      //TODO: removing User
      // removeUser: async (parent, args, context) => {
      //   if (context.user) {
      //     return User.findOneAndDelete({ _id: context.user._id });
      //   }
      //   throw new AuthenticationError(`You need to be logged in!`);
      // },
    },
  },
};

export const typeDefs = gql`
  type Auth {
    _id: ID!
    token: ID! #should i use {uuid} or a JSWT for this datatype?
    userID: ID!
    user: String
    username: String!
    email: String!
    password: String!
    User: User
  }

  type User {
    _id: ID!
    userID: ID! # changed user to userId
    username: String!
    email: String!
    password: String!
  }

  type Query {
    addUser(userID: ID!): User,
    loginUser(userID: ID!, username: String!): User
  }

  type Mutation {
    addUser(
      username: String!
      email: String
      password: String!
    ): User

    loginUser(
      username: String!
      email: String
      password: String!
    ): User

    updateUser(
      _id: ID!
      username: String!
      email: String
      password: String!
    ): User
    
    removeUser: User
  }
`;

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});
const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
};
addSchemaLevelResolveFunction(schema, rootResolveFunction);
