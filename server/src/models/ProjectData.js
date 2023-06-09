import mongoose from 'mongoose'
const { model } = mongoose

const ProjectData = new mongoose.Schema({
  projectId: {
    type: Number,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  inspectorName: {
    type: String,
    required: true
  },
  workDescription: {
    type: String,
    required: true
  }
})

// const ProjectData = mongoose.model('ProjectData', ProjectData)
export const ProjectDataModel = model('ProjectData', ProjectData)
// export default ProjectData
