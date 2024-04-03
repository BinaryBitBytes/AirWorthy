import AirlinerModel from "./Airliner.mjs";
import AuthModel from "./Auth.mjs";
import InspectorModel from "./Inspector.mjs";
import ManagerModel from "./Manager.mjs";
import ProjectModel from "./Project.mjs";
import ProjectDataModel from "./ProjectData.mjs";
import TechnicianModel from "./Technician.mjs";

//! Needs to go in controllers
// Manager.hasMany(Project, {
//   foreignKey: 'manager_id',
//   onDelete: 'CASCADE',
// });

// Technician.belongsTo(Project, {
//   foreignKey: 'user_id',
// });

export default {
  AirlinerModel,
  AuthModel,
  InspectorModel,
  ManagerModel,
  ProjectModel,
  ProjectDataModel,
  TechnicianModel,
};
