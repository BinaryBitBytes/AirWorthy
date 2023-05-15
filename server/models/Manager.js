import { Schema, model } from "mongoose"; //uncommented 5/12/23 to test main
// import mongoose from "main";
import {managerResolvers} from "../schemas/resolvers.js"
const managerSchema = new managerResolvers(
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

export default model("Manager", managerSchema);