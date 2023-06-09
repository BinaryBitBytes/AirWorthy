import pkg from 'apollo-server';
const { gql } = pkg;
import { makeExecutableSchema } from '@graphql-tools/schema'


export const InspectorTypeDefs = gql`
input Inspector {
      # //TODO need to add a real input type to Inspector named inspectorInput and change Inspector back to type Inspector

    _id: ID!
    inspectorName: String
    isAdmin: Boolean
    # onProject: [Project] <!---Bug
    username: String!
    email: String
    password: String
  }
  type onProject {
    _id: ID!
  }
`;