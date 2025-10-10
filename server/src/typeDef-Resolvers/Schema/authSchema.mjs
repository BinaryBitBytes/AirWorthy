// import { gql } from 'apollo-server'
// import gql  from 'gql-tag'
// const { gql } = gql
// import { gql } from '../../../node_modules/apollo-server/src/exports.ts'
// import { gql } from'apollo-server-core'
import gql from "../../gql.mjs";
import { isDocumentNode } from "@apollo/subgraph/dist/schema-helper/index.js";

// export const AuthTypeDefs = gql`
function AuthTypeDefs() {
  const typeDefs = gql`
    type User {
      _id: ID!
      token: String
      username: String
      email: String
      password: String
      isAdmin: Boolean
    }
    type Query {
      id: ID!
      auth: User
      auths: [User]
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
  return typeDefs;
}
//console Logging the document to be revealed as a string
console.log(AuthTypeDefs(isDocumentNode(toString())));
export { AuthTypeDefs };
console.log({ AuthTypeDefs });
