import ProjectData_Data from "./projectData-Data.mjs";
import ProjectData from "./projectData.mjs";
import TechnicianData from "./technicianData.mjs";
import AuthData from "./authData.mjs";
import AirlinerData from "./airlinerData.mjs";
import InspectorData from "./inspectorData.mjs";
import ManagerData from "./managerData.mjs";

console.log(
  JSON.stringify({
    airliner: { [AirlinerData]: { ...AirlinerData } },
    inspector: { InspectorData },
    manager: { ManagerData },
    data_project: { ProjectData_Data },
    project: { ProjectData },
    technician: { TechnicianData },
    auth: { AuthData },
  })
);

export {
  AirlinerData,
  InspectorData,
  ManagerData,
  ProjectData_Data,
  ProjectData,
  TechnicianData,
  AuthData,
};
