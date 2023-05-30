import { typeDef as Airliner } from './airlinerSchema.js';
import { typeDef as Auth } from './authSchema.js';
import { typeDef as Inspector } from './inspectorSchema.js';
import { typeDef as Manager } from './managerSchema.js';
import { typeDef as ProjectData } from './projectDataSchema.js';
import { typeDef as Project } from './projectSchema.js';
import { typeDef as Technician } from './technicianSchema.js';

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