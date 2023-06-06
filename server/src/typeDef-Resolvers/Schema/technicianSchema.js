import pkg from 'apollo-server';
const { gql } = pkg;
import { makeExecutableSchema } from '@graphql-tools/schema'


export const TechnicianTypeDefs = gql`
# //TODO need to add a real input type to technician named technicianInput and change auth back to type technician

input Technician {
    _id: ID!
    technicianName: String
    isAdmin: Boolean
    # onProject: [Project]
    username: String!
    email: String
    password: String
}
` ;