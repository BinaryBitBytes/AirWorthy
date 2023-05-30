import { resolvers as airlinerResolvers } from './airlinerSchema.js';
import { resolvers as authResolvers } from './authSchema.js';
import { resolvers as inspectorResolvers } from './inspectorSchema.js';
import { resolvers as managerResolvers } from './managerSchema.js';
import { resolvers as projectDataResolvers } from './projectDataSchema.js';
import { resolvers as projectResolvers } from './projectSchema.js';
import { resolvers as technicianResolvers } from './technicianSchema.js';

export const resolvers = [
    airlinerResolvers,
    authResolvers,
    inspectorResolvers,
    managerResolvers,
    projectDataResolvers,
    projectResolvers,
    technicianResolvers
]

console.log(resolvers)