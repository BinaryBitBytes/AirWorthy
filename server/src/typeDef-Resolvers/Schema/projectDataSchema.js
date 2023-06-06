import pkg from 'apollo-server';
const { gql } = pkg;
import { makeExecutableSchema } from '@graphql-tools/schema'


export const ProjectDataTypeDefs = gql`
    # //TODO need to add a real input type to projectData named projectDataInput and change auth back to type projectData
input ProjectData {
    _id: ID!
    projectId: Int
    projectName: String
    inspectorName: String
    workDescription: String
  }
` ;