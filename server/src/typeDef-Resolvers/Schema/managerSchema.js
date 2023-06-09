import pkg from 'apollo-server';
const { gql } = pkg;
import { makeExecutableSchema } from '@graphql-tools/schema'


export const ManagerTypeDefs = gql`
    input Manager {
# //TODO need to add a real input type to Mananger named managerInput and change manager back to type Manager
        _id: ID!
        managerName: String
        isAdmin: Boolean
        # onProject: [Project]
        username: String!
        email: String
        password: String
  }
` ;