import pkg from 'mongoose'
import { resolvers } from '../typeDef-Resolvers/projectSchema.js'
const { model, Schema } = pkg

const projectSchema = new Schema({
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

const project = { resolvers }
model('Project', projectSchema)
model.project = new project(projectSchema)

export default model('Project') // Use "Project" as the model name

// import pkg from 'mongoose';
// const { model } = pkg;
// //! const mongoose = require("mongoose"); //uncommented 5/12/23 to test main
// import { resolvers } from "../typeDef-Resolvers/projectSchema.js";
// const project = { resolvers };
// model.project = new project(
//   {
//     id: {
//       type: Number,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     projectName: [{ type: String }],
//     workDescription: [{ body: String }],
//     startingDate: [{ date: Date }],
//     modelAircraft: [{ type: Number }],

//   },
//   {
//     timestamps: true,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "project",
//   }
// );
// // console.log(project);
// export default model("Project", projectSchema);