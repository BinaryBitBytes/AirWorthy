import { gql } from 'apollo-server'

export const AuthTypeDefs = gql`
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
    addUser(username: String, token: String, email: String, password: String, isAdmin: Boolean): User
    loginUser(username: String, token: String, email: String, password: String): User
  }
`
