// import gql from 'apollo-server'
// import gql from 'gql-tag'
// const { gql } = gql
// import { gql } from '../../../node_modules/apollo-server/src/exports.ts'
// import { gql } from'apollo-server-core'
import gql from "../../gql.mjs";
import { isDocumentNode } from "@apollo/subgraph/dist/schema-helper/index.js";

// export const InspectorTypeDefs = gql`
function InspectorTypeDefs() {
  const typeDefs = gql`
    interface Inspector {
      _id: ID!
      inspectorName: String
      isAdmin: Boolean
      onProject: [Project]
      username: String!
      email: String
      password: String
    }

    type Inspector {
      inspectors: [Inspector]
      inspector(inspectorID: ID!): Inspector
    }

    type Mutation_implements_Inspector {
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
  return typeDefs;
}
//console Logging the document to be revealed as a string
console.log(InspectorTypeDefs(isDocumentNode(toString())));

export default { InspectorTypeDefs };
console.log({ InspectorTypeDefs });
