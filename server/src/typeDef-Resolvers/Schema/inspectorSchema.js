import pkg from 'apollo-server';
const { gql } = pkg;

export const InspectorTypeDefs = gql`
  type Inspector {
    _id: ID!
    inspectorName: String
    isAdmin: Boolean
    onProject: [Project]
    username: String!
    email: String
    password: String
  }

  type Project {
    _id: ID!
    # Add other fields for the Project type
    # ...
  }

  input InspectorInput {
    inspectorName: String
    isAdmin: Boolean
    onProject: [ID]
    username: String!
    email: String
    password: String
  }

  type Query {
    inspectors: [Inspector]
    inspector(inspectorID: ID!): Inspector
  }

  type Mutation {
    addInspector(inspector: InspectorInput): Inspector
    addProject(inspectorID: ID!, projectID: ID!): Inspector
    removeInspector(inspectorID: ID!): Boolean
    removeProject(inspectorID: ID!, projectID: ID!): Inspector
  }
`;
