// import { gql } from '../../../node_modules/apollo-server/src/exports.ts'
// import { gql } from'apollo-server-core'
// import gql from 'gql-tag'
// const { gql } = gql
// export const AirlinerTypeDefs = gql`
import gql from "../../gql.mjs";

//  Airliner represents an airline company.
const AirlinerTypeDefs = gql`
  """
  AIRLINER
  """
  type Airliner {
    _id: ID!
    airlinerName: String
    isAdmin: Boolean
    modelAircraft: [String]
    email: String
    password: String
  }

  # The Query for the Airliner
  type Query {
    # Get an airliner by ID.
    airliner(_id: ID!): Airliner

    # Get airliners by airliner name.
    airliners(airlinerName: String): [Airliner]
  }

  # Mustation for Airliner
  type Mutation {
    # Add a new airliner.
    addAirliner(
      airlinerName: String
      _isAdmin: Boolean
      modelAircraft: [String]
      email: String
      password: String
    ): Airliner

    #  Remove an existing airliner.
    removeAirliner(_id: ID!): Boolean
  }
`;

export { AirlinerTypeDefs };
console.log({ AirlinerTypeDefs });
console.log("================================================================");
console.log(AirlinerTypeDefs);

//  export const AirlinerTypeDefs = gql(`
//   """
//   Airliner represents an airline company.
//   """
//   type Airliner {
//     _id: ID!
//     airlinerName: String
//     isAdmin: Boolean
//     modelAircraft: [String]
//     email: String
//     password: String
//   }

//   type Query {
//     """
//     Get an airliner by ID.
//     """
//     airliner(_id: ID!): Airliner

//     """
//     Get airliners by airliner name.
//     """
//     airliners(airlinerName: String): [Airliner]
//   }

//   type Mutation {
//     """
//     Add a new airliner.
//     """
//     addAirliner(
//       airlinerName: String
//       _isAdmin: Boolean
//       modelAircraft: [String]
//       email: String
//       password: String
//     ): Airliner

//     """
//     Remove an existing airliner.
//     """
//     removeAirliner(_id: ID!): Boolean
//   }
// `);

console.log(AirlinerTypeDefs);
