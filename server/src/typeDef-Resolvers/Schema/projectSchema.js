import pkg from 'apollo-server'
const { gql } = pkg
// import { makeExecutableSchema } from '@graphql-tools/schema'

export const ProjectTypeDefs = gql`
    # //TODO need to add a real input type to project named projectInput and change project back to type project
input Project {
    _id: ID!
    projectName: String
    inspectorName: String
    workDescription: String
  }
`
