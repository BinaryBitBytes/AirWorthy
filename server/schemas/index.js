import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';


import { typeDef as Airliner, resolvers as airlinerResolvers } from './airlinerSchema';
import { typeDef as Auth, resolvers as authResolvers } from './authSchema';
import { typeDef as Inspector, resolvers as inspectorResolvers } from './inspectorSchema';
import { typeDef as Manager, resolvers as managerResolvers } from './managerSchema';
import { typeDef as ProjectData, resolvers as projectDataResolvers } from './projectDataSchema';
import { typeDef as Project, resolvers as projectResolvers } from './projectSchema';
import { typeDef as Technician, resolvers as technicianResolvers } from './technicianSchema';

export default function typeDef() {
    return (
    Airliner,
    Auth,
    Inspector,
    Manager,
    ProjectData,
    Project,
    Technician
    )
}
export function resolvers() {
    return (
    airlinerResolvers,
    authResolvers,
    inspectorResolvers,
    managerResolvers,
    projectDataResolvers,
    projectResolvers,
    technicianResolvers
    )
}

// export default typeDef;
// export default resolvers;
// module.exports.typeDef = (Airliner, Auth, Inspector, Manager, ProjectData, Project, Technician );
// module.exports.resolvers = { airlinerResolvers, authResolvers, inspectorResolvers, managerResolvers, projectDataResolvers, projectResolvers, technicianResolvers };
