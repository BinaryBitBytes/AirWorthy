import mongoose from "mongoose";
class ProjectDataModel {
  constructor() {
    this.schema = new mongoose.Schema({
      projectId: {
        type: Number,
        required: true,
      },
      projectName: {
        type: String,
        required: true,
      },
      inspectorName: {
        type: String,
        required: true,
      },
      workDescription: {
        type: String,
        required: true,
      },
    });
    this.model = mongoose.model("ProjectData", this.schema);
  }
}
console.log(`
  Console Log(typeof) ===  ${typeof ProjectDataModel} 
-----------------
  Console.log(ProjectDataModel)
  ${ProjectDataModel}
------------
  `);
ProjectDataModel;
console.log(ProjectDataModel);
// const ProjectData = mongoose.model('ProjectData', ProjectData)
// export default ProjectData
export default ProjectDataModel;
