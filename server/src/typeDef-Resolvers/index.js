// import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';


import { typeDef as Airliner, resolvers as airlinerResolvers } from './airlinerSchema.js';
import { typeDef as Auth, resolvers as authResolvers } from './authSchema.js';
import { typeDef as Inspector, resolvers as inspectorResolvers } from './inspectorSchema.js';
import { typeDef as Manager, resolvers as managerResolvers } from './managerSchema.js';
import { typeDef as ProjectData, resolvers as projectDataResolvers } from './projectDataSchema.js';
import { typeDef as Project, resolvers as projectResolvers } from './projectSchema.js';
import { typeDef as Technician, resolvers as technicianResolvers } from './technicianSchema.js';


export default function typeDef(){
     return [
    Airliner,
    Auth,
    Inspector,
    Manager,
    ProjectData,
    Project,
    Technician
    ];
};
console.log(typeDef);
// export default function typeDef() {
//     const all = (
//     Airliner,
//     Auth,
//     Inspector,
//     Manager,
//     ProjectData,
//     Project,
//     Technician)
//     return all;
// }
console.log(typeDef());

export const resolvers = [
    airlinerResolvers,
    authResolvers,
    inspectorResolvers,
    managerResolvers,
    projectDataResolvers,
    projectResolvers,
    technicianResolvers
]

// export function resolvers() {
//     const all = (airlinerResolvers,
//     authResolvers,
//     inspectorResolvers,
//     managerResolvers,
//     projectDataResolvers,
//     projectResolvers,
//     technicianResolvers)
//     return all;
// }
console.log(resolvers)


// module.exports = {
//         typeDef,
//         resolvers
//     }
// export default typeDef;
// export default resolvers;
// module.exports.typeDef = (Airliner, Auth, Inspector, Manager, ProjectData, Project, Technician );
// module.exports.resolvers = { airlinerResolvers, authResolvers, inspectorResolvers, managerResolvers, projectDataResolvers, projectResolvers, technicianResolvers };
