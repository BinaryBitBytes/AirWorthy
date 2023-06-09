import { gql } from 'apollo-server';

export const ManagerTypeDefs = gql`
  input ManagerInput {
    managerName: String
    isAdmin: Boolean
    username: String!
    email: String
    password: String
  }

  type Manager {
    _id: ID!
    managerName: String
    isAdmin: Boolean
    username: String!
    email: String
    password: String
  }
`;
