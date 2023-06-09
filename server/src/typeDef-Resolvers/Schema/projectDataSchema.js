import pkg from 'apollo-server'
// import { makeExecutableSchema } from '@graphql-tools/schema'
const { gql } = pkg

export const ProjectDataTypeDefs = gql`
input ProjectData {
    _id: ID!
    projectId: Int
    projectName: String
    inspectorName: String
    workDescription: String
  }
`
