// import gql from 'apollo-server'
// import gql from 'gql-tag'
// const { gql } = gql
// import { gql } from '../../../node_modules/apollo-server/src/exports.ts'
// import { gql } from'apollo-server-core'
import gql from "../../gql.mjs";

// export const InspectorTypeDefs = gql`
const InspectorTypeDefs = gql`
  interface Inspector {
    _id: ID!
    inspectorName: String
    isAdmin: Boolean
    onProject: [Project]
    username: String!
    email: String
    password: String
  }

  type Query implements Inspector {
    inspectors: [Inspector]
    inspector(inspectorID: ID!): Inspector
  }

  type Mutation implements Inspector {
    addInspector(inspector: InspectorInput): Inspector
    # addProject(inspectorID: ID!, projectID: ID!): Inspector
    removeInspector(inspectorID: ID!): Boolean
    # removeProject(inspectorID: ID!, projectID: ID!): Inspector
  }
  input InspectorInput {
    inspectorName: String
    isAdmin: Boolean
    onProject: [ID]
    username: String!
    email: String
    password: String
  }
`;

export { InspectorTypeDefs };
console.log({ InspectorTypeDefs });
