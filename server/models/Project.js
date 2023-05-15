import { Schema, model } from "mongoose"; //uncommented 5/12/23 to test main
//! const mongoose = require("mongoose"); //uncommented 5/12/23 to test main
// import { Schema, model } from "main";
import {projectResolvers} from "../schemas/resolvers.js"
const projectSchema = new projectResolvers(
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

export default model("Project", projectSchema);