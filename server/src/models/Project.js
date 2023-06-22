import mongoose from 'mongoose'
const { model } = mongoose
// import { resolvers } from '../typeDef-Resolvers/projectSchema.js'

const Project = new mongoose.Schema({
  id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  projectName: [{ type: String }],
  workDescription: [{ body: String }],
  startingDate: [{ date: Date }],
  modelAircraft: [{ type: Number }]
}, {
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'Project'
})
const ProjectModel=  model('Project', Project)
export default ProjectModel