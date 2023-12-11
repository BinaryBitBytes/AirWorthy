// import gql from 'apollo-server'
// import gql  from 'gql-tag'
// const { gql } = gql
// import { gql } from '../../../node_modules/apollo-server/src/exports.ts'
// import { gql } from'apollo-server-core'
import gql from "../../gql.mjs";

// export const ManagerTypeDefs = gql`
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
console.log(ManagerTypeDefs);
