import mongoose from "mongoose";
const { model } = mongoose;

const ProjectData = new mongoose.Schema({
  id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
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

// const ProjectData = mongoose.model('ProjectData', ProjectData)
const ProjectDataModel = model("ProjectData", ProjectData);
// export default ProjectData
export default ProjectDataModel;
