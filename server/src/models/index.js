import { AirlinerModel } from './Airliner.js'
import { AuthModel } from './Auth.js'
import { InspectorModel } from './Inspector.js'
import { ManagerModel } from './Manager.js'
import { ProjectModel } from './Project.js'
import { ProjectDataModel } from './ProjectData.js'
import { TechnicianModel } from './Technician.js'

//! Needs to go in controllers
// Manager.hasMany(Project, {
//   foreignKey: 'manager_id',
//   onDelete: 'CASCADE',
// });

// Technician.belongsTo(Project, {
//   foreignKey: 'user_id',
// });

export default { AirlinerModel, AuthModel, InspectorModel, ManagerModel, ProjectModel, ProjectDataModel, TechnicianModel }
