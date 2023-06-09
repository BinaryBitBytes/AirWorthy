import { createApplication } from 'graphql-modules'
import { AirlinerModule } from './airlinerModule.js'
import { AuthModule } from './authModule.js'
import { InspectorModule } from './inspectorModule.js'
import { ManagerModule } from './managerModule.js'
// import { ProjectDataModule } from './projectDataModule.js';
import { ProjectModule } from './projectModule.js'
import { TechnicianModule } from './technicianModule.js'

export const application = createApplication({
  modules: [AirlinerModule, AuthModule, InspectorModule, ManagerModule, ProjectModule, TechnicianModule]
  // modules: [AirlinerModule, AuthModule, InspectorModule, ManagerModule, ProjectDataModule, ProjectModule, TechnicianModule],
})
