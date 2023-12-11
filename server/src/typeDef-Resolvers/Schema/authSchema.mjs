// import { gql } from 'apollo-server'
// import gql  from 'gql-tag'
// const { gql } = gql
// import { gql } from '../../../node_modules/apollo-server/src/exports.ts'
// import { gql } from'apollo-server-core'
import gql from "../../gql.mjs";

// export const AuthTypeDefs = gql`
const AuthTypeDefs = gql`
  type Query {
    auth: User
    auths: [User]
  }

  type User {
    _id: ID
    token: String
    username: String
    email: String
    password: String
    isAdmin: Boolean
  }

  type Mutation {
    addUser(
      username: String
      token: String
      email: String
      password: String
      isAdmin: Boolean
    ): User
    loginUser(
      username: String
      token: String
      email: String
      password: String
    ): User
  }
`;
export default { AuthTypeDefs };
console.log({ AuthTypeDefs });
