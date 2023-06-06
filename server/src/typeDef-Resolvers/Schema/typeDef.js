import { AirlinerTypeDefs } from './airlinerSchema.js';
import { AuthTypeDefs } from './authSchema.js';
import { InspectorTypeDefs } from './inspectorSchema.js';
import { ManagerTypeDefs } from './managerSchema.js';
import { ProjectDataTypeDefs } from './projectDataSchema.js';
import { ProjectTypeDefs } from './projectSchema.js';
import { TechnicianTypeDefs } from './technicianSchema.js';

const typeDefs = [
        AirlinerTypeDefs,
        AuthTypeDefs,
        InspectorTypeDefs,
        ManagerTypeDefs,
        ProjectDataTypeDefs,
        ProjectTypeDefs,
        TechnicianTypeDefs
      ];
// const typeDefs = [
// AirlinerTypeDefs,
// AuthTypeDefs,
// InspectorTypeDefs,
// ManagerTypeDefs,
// ProjectDataTypeDefs,
// ProjectTypeDefs,
// TechnicianTypeDefs
// ]
export default typeDefs;
// console.log(typeDefs());