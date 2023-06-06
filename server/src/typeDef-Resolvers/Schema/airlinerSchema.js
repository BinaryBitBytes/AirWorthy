import { makeExecutableSchema } from '@graphql-tools/schema'
import pkg2 from 'apollo-server-express';
const { gql } = pkg2;
import pkg from 'graphql'
const { graphql, buildSchema } = pkg;
// import { AirlinerSchema } from '../models/Airliner.js';

export const AirlinerTypeDefs = {
  Airliner: {
    Query: {
      airliner: async (parent, { _id }) => {
        // return AirlinerSchema.findOne({ _id: airlinerID }).populate("airliner"); //! added await
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

export const typeDefs = buildSchema (`
    # //TODO need to add a real input type to Airliner named airlinerInput and change Airliner back to type Airliner
  type Airliner {
    _id: ID!
    airlinerName: String
    isAdmin: Boolean
    # modelAircraft: [String]
    modelAircraft: String
    username: String!
    email: String
    password: String
  }

  input AirlinerInput {
    airlinerName: String
    isAdmin: Boolean
    # modelAircraft: [String]
    modelAircraft: String
    username: String!
    email: String
    password: String
  }
  # type Auth {
  #   token: ID!
  #   airliner: Airliner
  # }
  type Query {
    airliner(airlinerID: ID!): Airliner,
    airliners(airlinerID: ID!): [Airliner]
  }

  # type Mutation {
  #   addAirliner(airlinerName: String!, isAdmin: Boolean!, modelAircraft: String, username: String! , email: String! , password: String!): Airliner
  # }
  type Mutation {
    addAirliner(input: AirlinerInput): Airliner
    }
`
)

graphql({ typeDefs }).then(response => {
  console.log(response)
})

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });
const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
};
// addSchemaLevelResolveFunction(schema, rootResolveFunction)
// console.log(typeof typeDef)
// console.log(typeDefs);