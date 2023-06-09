import {gql} from 'apollo-server';

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
