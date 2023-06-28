import { AirlinerTypeDefs } from './airlinerSchema.js'
import { AuthTypeDefs } from './authSchema.js'
import { InspectorTypeDefs } from './inspectorSchema.js'
import { ManagerTypeDefs } from './managerSchema.js'
import { ProjectDataTypeDefs } from './projectDataSchema.js'
import { ProjectTypeDefs } from './projectSchema.js'
import { TechnicianTypeDefs } from './technicianSchema.js'
import gql  from 'graphql-tag'
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