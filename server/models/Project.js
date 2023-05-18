// import { model } from "mongoose"; //uncommented 5/12/23 to test main
import pkg from 'mongoose';
const { model } = pkg;
//! const mongoose = require("mongoose"); //uncommented 5/12/23 to test main
// import { Schema, model } from "main";
// import {projectResolvers} from "../schemas/resolvers.js"
// const projectSchema = new projectResolvers(
  import {resolvers} from "../schemas/projectSchema.js";
  const project = {resolvers};
  model.project = new project(    
  {
        id: {
            type: Number,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        projectName: [{type: String}],
        workDescription:[{body: String}],
        startingDate: [{date: Date}],
        modelAircraft:[{type: Number}],

    },
    {
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "project",
  }
);
console.log(project);
export default model("Project", projectSchema);