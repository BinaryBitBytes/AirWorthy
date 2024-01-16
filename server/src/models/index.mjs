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
const airlinerModel = new AirlinerModel();
const authModel = new AuthModel();
const inspectorModel = new InspectorModel();
const managerModel = new ManagerModel();
const projectModel = new ProjectModel();
const projectDataModel = new ProjectDataModel();
const technicianModel = new TechnicianModel();

export default {
  airlinerModel: [airlinerModel],
  authModel: [authModel],
  inspectorModel: [inspectorModel],
  managerModel: [managerModel],
  projectModel: [projectModel],
  projectDataModel: [projectDataModel],
  technicianModel: [technicianModel],
};
