

import pkg from 'apollo-server';
const { gql } = pkg;
import { makeExecutableSchema } from '@graphql-tools/schema'


export const ProjectDataTypeDefs = gql`
input ProjectData {
    _id: ID!
    projectId: Int
    projectName: String
    inspectorName: String
    workDescription: String
  }
` ;