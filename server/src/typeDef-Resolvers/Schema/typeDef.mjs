import { AirlinerTypeDefs } from './airlinerSchema.mjs'
import { AuthTypeDefs } from './authSchema.mjs'
import { InspectorTypeDefs } from './inspectorSchema.mjs'
import { ManagerTypeDefs } from './managerSchema.mjs'
import { ProjectDataTypeDefs } from './projectDataSchema.mjs'
import { ProjectTypeDefs } from './projectSchema.mjs'
import { TechnicianTypeDefs } from './technicianSchema.mjs'
// import gql  from 'graphql-tag'
// import { gql } from '../../../node_modules/apollo-server/src/exports.ts'
// import { gql } from'apollo-server-core'
import { gql } from '../../gql.mjs'

// import { gql } from 'apollo-server'
// const typeDefs = [
//         gql(AirlinerTypeDefs),
//         gql(AuthTypeDefs),
//         gql(InspectorTypeDefs),
//         gql(ManagerTypeDefs),
//         gql(ProjectDataTypeDefs),
//         gql(ProjectTypeDefs),
//         gql(TechnicianTypeDefs)
//       ];
const typeDefs = gql`
  ${AirlinerTypeDefs},
  ${AuthTypeDefs},
  ${InspectorTypeDefs},
  ${ManagerTypeDefs},
  ${ProjectDataTypeDefs},
  ${ProjectTypeDefs},
  ${TechnicianTypeDefs}
`;
// console.log(typeDefs());
export default typeDefs

console.log(typeof(typeDefs))
console.log(typeDefs);