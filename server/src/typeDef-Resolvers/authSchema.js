// const { ApolloServer, gql } = require('apollo-server');
import { gql, makeExecutableSchema } from 'apollo-server';

export const typeDef = gql`
type Auth {
    token: ID! #should i use {uuid} or a JSWT for this datatype?
    _id: ID!
    userID: String # changed user to userId
    username: String!
    email: String!
    password: String!
  }
`;
console.error(typeDef);

export const resolvers = {
  Auth: {
    Query:
    {
      me: async (parent, { userId }) => {
        return await User.findOne({
          $or: [{ _id: userId }, { username: username }],
        }).populate("savedBooks");
      },
    },

    Mutation:
    {
      loginUser: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError("Cannot find this user");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Wrong password!");
        }
        const token = signToken(user);
        return { token, user };
      },

      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });

        if (!user) {
          return res.status(400).json({ message: "Something is wrong!" });
        }
        const token = signToken(user);
        return { token, user };
      },
    },
  }
};
const schema = makeExecutableSchema({
  typeDef,
  resolvers,
});
const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
};
addSchemaLevelResolveFunction(schema, rootResolveFunction)
console.log(resolvers.Auth.Query.me);
// module.exports = {typeDef, resolvers}