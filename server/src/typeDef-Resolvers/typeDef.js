import { typeDefs as Airliner } from './airlinerSchema.js';
import { typeDefs as Auth } from './authSchema.js';
import { typeDefs as Inspector } from './inspectorSchema.js';
import { typeDefs as Manager } from './managerSchema.js';
import { typeDefs as ProjectData } from './projectDataSchema.js';
import { typeDefs as Project } from './projectSchema.js';
import { typeDefs as Technician } from './technicianSchema.js';

export const typeDef = {
    Airliner,
    Auth,
    Inspector,
    Manager,
    ProjectData,
    Project,
    Technician
};

console.log(typeDef);