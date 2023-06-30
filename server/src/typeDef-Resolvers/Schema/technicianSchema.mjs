// import gql from 'apollo-server'
// import gql  from 'gql-tag'
// const { gql } = gql
// import { gql } from '../../../node_modules/apollo-server/src/exports.ts'
// import { makeExecutableSchema } from '@graphql-tools/schema'
// import { gql } from'apollo-server-core'
import gql  from '../../gql.mjs'

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
`
