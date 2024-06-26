// import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
// import { typeDef as Airliner, resolvers as airlinerResolvers } from './airlinerSchema.js';
// import { typeDef as Auth, resolvers as authResolvers } from './authSchema.js';
// import { typeDef as Inspector, resolvers as inspectorResolvers } from './inspectorSchema.js';
// import { typeDef as Manager, resolvers as managerResolvers } from './managerSchema.js';
// import { typeDef as ProjectData, resolvers as projectDataResolvers } from './projectDataSchema.js';
// import { typeDef as Project, resolvers as projectResolvers } from './projectSchema.js';
// import { typeDef as Technician, resolvers as technicianResolvers } from './technicianSchema.js';
import resolvers from "../typeDef-Resolvers/Resolvers/resolvers.mjs";
import * as typedef from "../typeDef-Resolvers/Schema/typeDef.mjs";
// export const resolver = resolvers;
export const resolver = resolvers;

export const typedefs = { typedef: typedef };

console.log({ typedefs });
console.log(resolvers);
