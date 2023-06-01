import { makeExecutableSchema } from '@graphql-tools/schema'
import pkg from 'apollo-server-express';
const { gql } = pkg;
// import { airlinerSchema } from '../models/Airliner.js';
import { typeDefs as Auth } from './authSchema.js';

export const resolvers = {
  Airliner: {
    Query: {
      airliner: async (parent, { _id }) => {
        return Airliner.findOne({ _id: airlinerID }).populate("airliner"); //! added await
      },
      airliners: async (parent, { airlinerName }) => {
        return Airliner.find().sort({ createdAt: -1 }).populate("airliner"); //! added await
      },

    },

    Mutation:
    {
      addAirliner: async (parent,
        { airlinerName, isAdmin, modelAircraft, username, email, password }
      ) => {
        const newAirliner = new Airliner({ airlinerName, isAdmin, modelAircraft, username, email, password });
        await newAirliner.build(airlinerName, username, email, password);
        await newAirliner.save();
        await newAirliner.populate("airliner");
        // return Airliner.create(
        //   {
        //     airlinerName,
        //     isAdmin,
        //     modelAircraft,
        //     email,
        //     username,
        //     password,
        //   }
        // );
      },
      addAirliner: async (parent, { airlinerID, airlinerName }) => {
        return airlinerID.findOneAndUpdate(
          { _id: airlinerID },
          {
            $addToSet: { airlinerName: { airlinerName } },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      },
      removeAirliner: async (parent, { airlinerID }) => {
        return airlinerID.fineOneAndDelete({ _id: airlinerID });
      },
      removeAirliner: async (parent, { airlinerID, airlinerName }) => {
        return airlinerID.destroy({ _id: airlinerID }, { airlinerName });
      },
    },
  }
};
console.log(resolvers.Airliner.Query.airliner);

export const typeDefs = gql`
  type Airliner {
    _id: ID!
    airlinerName: String
    isAdmin: Boolean
    modelAircraft: [String]
    username: String!
    email: String
    password: String
  }
  type Auth {
    token: ID!
    airliner: Airliner
  }
  type Query {
    airliner(airlinerID: ID!): Airliner,
    airliners(airlinerID: ID!): [Airliner]
  }

  type Mutation {
    addAirliner(airlinerName: String!, isAdmin: Boolean!, modelAircraft: String, username: String! , email: String! , password: String!): Auth
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
};
addSchemaLevelResolveFunction(schema, rootResolveFunction)
// console.log(typeof typeDef)
console.log(typeDefs);