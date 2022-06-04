const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    savedBooks: [Book]
  }

  type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

   type Auth {
    token: ID!
    user: User
  }

  input BookData {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
}

  type Query {
    me(userId: ID!): User
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(userId: ID!, bookData: BookData): User
    removeBook(userId: ID!, bookId: ID!): User
  }
`;

module.exports = typeDefs;
