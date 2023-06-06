// Resolvers > Models > Schema
import pkg from 'mongoose';
const { model } = pkg;
//! const mongoose = require("mongoose"); //uncommented 5/12/23 to test main
import { resolvers } from "../typeDef-Resolvers/airlinerSchema.js";
const airliner = { resolvers };
model.airliner = new airliner(
  {
    id: {
      type: Number,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    airlinerName: [{ type: String }],
    isAdmin: { type: Boolean, enum: [true] },
    modelAircraft: [{ type: String }],
    userName: String,
    email: String,
    password: String
  },
  {
    hooks: {
      beforeCreate: async (newAirlinerData) => {
        newAirlinerData.password = await bcrypt.hash(newAirlinerData.password, 10);
        return newAirlinerData;
      },
      beforeUpdate: async (updatedAirlinerData) => {
        updatedAirlinerData.password = await bcrypt.hash(
          updatedAirlinerData.password,
          10
        );
        return updatedAirlinerData;
      },
    },
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "airlinerSchema",
  }
);
// console.log(airliner);
export default model("airlinerSchema", airlinerSchema);