import mongoose from 'mongoose'

const ProjectDataSchema = new mongoose.Schema({
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

const ProjectData = mongoose.model('ProjectData', ProjectDataSchema)

export default ProjectData
