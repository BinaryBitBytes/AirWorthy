import { AirlinerTypeDefs } from "./airlinerSchema.mjs";
import { AuthTypeDefs } from "./authSchema.mjs";
import { InspectorTypeDefs } from "./inspectorSchema.mjs";
import { ManagerTypeDefs } from "./managerSchema.mjs";
import { ProjectDataTypeDefs } from "./projectDataSchema.mjs";
import { ProjectTypeDefs } from "./projectSchema.mjs";
import { TechnicianTypeDefs } from "./technicianSchema.mjs";
// import { gql } from "apollo-server-core";

// const AIRLINER = gql("Airliner", AirlinerTypeDefs);
// console.log(AIRLINER);

export default async function typeDefs() {
  return {
    AirlinerTypeDefs,
    AuthTypeDefs,
    InspectorTypeDefs,
    ManagerTypeDefs,
    ProjectDataTypeDefs,
    ProjectTypeDefs,
    TechnicianTypeDefs,
  };
}
console.log({ typeDefs });
console.log(typeof typeDefs);
console.log(typeDefs());

// const typeDefs = () => {
//   // AIRLINER,
//   [
//     {
//       AirlinerTypeDefs,
//       AuthTypeDefs,
//       InspectorTypeDefs,
//       ManagerTypeDefs,
//       ProjectDataTypeDefs,
//       ProjectTypeDefs,
//       TechnicianTypeDefs,
//     },
//   ];
//   return;
// };

// export default typeDefs;

//*
// const typeDefs = [
//   {
//     AirlinerTypeDefs,
//     AuthTypeDefs,
//     InspectorTypeDefs,
//     ManagerTypeDefs,
//     ProjectDataTypeDefs,
//     ProjectTypeDefs,
//     TechnicianTypeDefs,
//   },
// ];

// const { AirlinerTypeDefs } = await import('./airlinerSchema.mjs')
// const { AuthTypeDefs } = await import('./authSchema.mjs')
// const { InspectorTypeDefs } = await import('./inspectorSchema.mjs')
// const { ManagerTypeDefs } = await import('./managerSchema.mjs')
// const { ProjectDataTypeDefs } = await import('./projectDataSchema.mjs')
// const { ProjectTypeDefs } = await import('./projectSchema.mjs')
// const { TechnicianTypeDefs } = await import('./technicianSchema.mjs')
// import gql  from 'graphql-tag'
// import { gql } from '../../../node_modules/apollo-server/src/exports.ts'
// import { gql } from'apollo-server-core'
//!!! import gql from '../../gql.mjs'
// import { gql } from '../../gql.mjs'
// import { gql } from 'apollo-server'

// import { gql } from 'apollo-server-core'
// const typeDefs = [
//         gql(AirlinerTypeDefs),
//         gql(AuthTypeDefs),
//         gql(InspectorTypeDefs),
//         gql(ManagerTypeDefs),
//         gql(ProjectDataTypeDefs),
//         gql(ProjectTypeDefs),
//         gql(TechnicianTypeDefs)
//       ];
// const typeDefs = gql`
//   ${AirlinerTypeDefs},
//   ${AuthTypeDefs},
//   ${InspectorTypeDefs},
//   ${ManagerTypeDefs},
//   ${ProjectDataTypeDefs},
//   ${ProjectTypeDefs},
//   ${TechnicianTypeDefs}
// `;

// // const typeDefs = {
// //   AirlinerTypeDefs,
// //   AuthTypeDefs,
// //   InspectorTypeDefs,
// //   ManagerTypeDefs,
// //   ProjectDataTypeDefs,
// //   ProjectTypeDefs,
// //   TechnicianTypeDefs
// // };
// const typeDefs=`
// ${await AirlinerTypeDefs}
// ${await AuthTypeDefs}
// ${await InspectorTypeDefs}
// ${await ManagerTypeDefs}
// ${await ProjectDataTypeDefs}
// ${await ProjectTypeDefs}
// ${await TechnicianTypeDefs}
// `
// const typeDefs = [
//   AirlinerTypeDefs,
//   AuthTypeDefs,
//   InspectorTypeDefs,
//   ManagerTypeDefs,
//   ProjectDataTypeDefs,
//   ProjectTypeDefs,
//   TechnicianTypeDefs
// ].join('\n');

// const TYPEDEFS = gql`
// ${JSON.stringify(typeDefs)}
// `;
// console.log(typeDefs());
// export default gql(typeDefs)

// console.log(typeof(TYPEDEFS))
// console.log(TYPEDEFS)
