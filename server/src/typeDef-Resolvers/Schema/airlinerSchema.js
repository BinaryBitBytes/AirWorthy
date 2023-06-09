import { gql } from 'apollo-server';
import { AirlinerModel } from '../../models/Airliner.js';

export const AirlinerTypeDefs = gql`
  type Airliner {
    _id: ID!
    airlinerName: String
    isAdmin: Boolean
    modelAircraft: [String]
    email: String
    password: String
  }

  type Query {
    airliner(_id: ID!): Airliner
    airliners(airlinerName: String): [Airliner]
  }

  type Mutation {
    addAirliner(
      airlinerName: String
      _isAdmin: Boolean
      modelAircraft: [String]
      email: String
      password: String
    ): Airliner
    removeAirliner(_id: ID!): Boolean
  }
`;

export const airlinerResolvers = {
  Query: {
    airliner: async (_, { _id }) => {
      return AirlinerModel.findOne({ _id });
    },
    airliners: async (_, { airlinerName }) => {
      return AirlinerModel.find({ airlinerName });
    },
  },
  Mutation: {
    addAirliner: async (_, { airlinerName, _isAdmin, modelAircraft, email, password }) => {
      const newAirliner = new AirlinerModel({
        airlinerName,
        isAdmin: _isAdmin,
        modelAircraft,
        email,
        password,
      });
      await newAirliner.save();
      return newAirliner;
    },
    removeAirliner: async (_, { _id }) => {
      await AirlinerModel.findByIdAndDelete(_id);
      return true;
    },
  },
};
