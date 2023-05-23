// import { model } from "mongoose"; //uncommented 5/12/23 to test main
import pkg from 'mongoose';
const { model } = pkg;
// import mongoose from "main";
// import {managerResolvers} from "../schemas/resolvers.js"
// const managerSchema = new managerResolvers(
  import {resolvers} from "../typeDef-Resolvers/managerSchema.js";
  const manager = {resolvers};
  model.manager= new manager(
    {
        id: {
            type: Number,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        managerName: {type: String, required: true, unique: true},
        isAdmin: {type: Boolean, enum:[true]},
        onProject: [{type: String}],
        userName: String,
        email: String,
        password: String
        
    },
    {
        hooks: {
          beforeCreate: async (newManagerData) => {
            newManagerData.password = await bcrypt.hash(newManagerData.password, 10);
            return newManagerData;
          },
          beforeUpdate: async (updatedManagerData) => {
            updatedManagerData.password = await bcrypt.hash(
              updatedManagerData.password,
              10
            );
            return updatedManagerData;
          },
        },
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "manager",
      }
);
console.log(manager);
export default model("Manager", managerSchema);