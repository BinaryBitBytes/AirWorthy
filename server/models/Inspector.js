import { Schema, model } from "mongoose"; //uncommented 5/12/23 to test main
// import mongoose from "main";
import {inspectorResolvers} from "../schemas/resolvers.js"
const inspectorSchema = new inspectorResolvers(
    {
        id: {
            type: Number,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        inspectorName: {type: String, required: true, unique: true},
        isAdmin: {type: Boolean, enum:[true]},
        onProject: [{type: String}],
        userName: String,
        email: String,
        password: String
    },
    {
        hooks: {
          beforeCreate: async (newInspectorData) => {
            newInspectorData.password = await bcrypt.hash(newInspectorData.password, 10);
            return newInspectorData;
          },
          beforeUpdate: async (updatedInspectorData) => {
            updatedInspectorData.password = await bcrypt.hash(
              updatedInspectorData.password,
              10
            );
            return updatedInspectorData;
          },
        },
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "inspector",
      }
);

export default model("Inspector", inspectorSchema);