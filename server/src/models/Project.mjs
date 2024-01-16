import mongoose from "mongoose";
//? import bcrypt from "bcrypt";

// const model = () => {
//   return mongoose;
// }; // import { resolvers } from '../typeDef-Resolvers/projectSchema.js'

class ProjectModel {
  constructor() {
    this.schema = new mongoose.Schema(
      {
        id: {
          type: Number,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        projectName: [{ type: String }],
        workDescription: [{ body: String }],
        startingDate: [{ date: Date }],
        modelAircraft: [{ type: Number }],
      },
      {
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: "Project",
      }
    ); //? End of Schema
    //? Start of Model
    this.model = mongoose.model("Project", this.schema);
    //? End of Model
  } //? End of Constructor
} //> End of Class
console.log(`
  Console Log(typeof) ===  ${typeof ProjectModel} 
-----------------
  Console.log(ProjectModel)
  ${ProjectModel}
------------
  `);
export default ProjectModel;
