// import { gql } from '../../../node_modules/apollo-server/src/exports.ts'
// import { gql } from'apollo-server-core'
// import gql from 'gql-tag'
// const { gql } = gql
// export const AirlinerTypeDefs = gql`
import gql from "../../gql.mjs";
// airlinerTypeDefs.mjs

const AirlinerTypeDefs = (() => {
  const typeDefs = gql`
    type Airliner {
      id: ID!
      name: String!
      capacity: Int!
      range: Int!
    }

    type Query {
      airliners: [Airliner]
    }

    type Mutation {
      addAirliner(name: String!, capacity: Int!, range: Int!): Airliner
    }
  `;

  return typeDefs;
})();

export { AirlinerTypeDefs };
// //  Airliner represents an airline company.
// const AirlinerTypeDefs = () => {
//   return gql`
//     """
//     AIRLINER
//     """
//     interface Airliner {
//       _id: ID!
//       airlinerName: String
//       isAdmin: Boolean
//       modelAircraft: [String]
//       email: String
//       password: String
//     }

//     # The Query for the Airliner
//     type Query implements Airliner {
//       # Get an airliner by ID.
//       airliner(_id: ID!): Airliner

//       # Get airliners by airliner name.
//       airliners(airlinerName: String): [Airliner]
//     }

//     # Mustation for Airliner
//     type Mutation implements Airliner {
//       # Add a new airliner.
//       addAirliner(
//         airlinerName: String
//         _isAdmin: Boolean
//         modelAircraft: [String]
//         email: String
//         password: String
//       ): Airliner

//       #  Remove an existing airliner.
//       removeAirliner(_id: ID!): Boolean
//     }
//   `;
// };
// export default AirlinerTypeDefs;
// console.log({ AirlinerTypeDefs });
// console.log("================================================================");
// console.log(AirlinerTypeDefs);

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
