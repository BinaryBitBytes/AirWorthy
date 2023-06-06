// Resolvers > Models > Schema
import pkg from 'mongoose';
const { Schema, model } = pkg;
//! const mongoose = require("mongoose"); //uncommented 5/12/23 to test main
import { resolvers } from "../typeDef-Resolvers/authSchema.js";
import { Token } from 'graphql';
const auth = { resolvers };

const authSchema= new Schema({
// model.auth = new auth(
//   {
    id: {
      type: Number,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    token:{
        type: Token,
        allowNull: false,
        primaryKey: false,
    },
    userID: [{ type: String }],
    user: String,
    userName: String,
    email: String,
    password: String,
    isAdmin: { type: Boolean, enum: [true] },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "authSchema",
  });

// console.log(auth);
export default model("authSchema", authSchema);
module.exports = {authSchema};