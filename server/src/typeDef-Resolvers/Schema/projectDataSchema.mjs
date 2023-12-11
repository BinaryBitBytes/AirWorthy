// import gql from 'apollo-server'
// import gql  from 'gql-tag'
// import { gql } from '../../../node_modules/apollo-server/src/exports.ts'
// const { gql } = gql
// import { gql } from'apollo-server-core'
import gql from "../../gql.mjs";

// export const ProjectDataTypeDefs = gql`
const ProjectDataTypeDefs = gql`
  input ProjectData {
    _id: ID!
    projectId: Int
    projectName: String
    inspectorName: String
    workDescription: String
  }
`;

export default { ProjectDataTypeDefs };
console.log({ ProjectDataTypeDefs });
