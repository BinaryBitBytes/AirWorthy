// Resolvers > Models > Schema
import pkg from 'mongoose'
import bcrypt from 'bcrypt'
// import { Token } from 'graphql'
const { Schema, model } = pkg
//! const mongoose = require("mongoose"); //uncommented 5/12/23 to test main
// import { AuthTypeDefs } from "../typeDef-Resolvers/authSchema.js";

const Auth = new Schema({
  id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: String,
    allowNull: false,
    primaryKey: false
  },
  userID: [{ type: String }],
  user: String,
  userName: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, enum: [true] }
},
{
  hooks: {
    beforeCreate: async (newUserData) => {
      newUserData.password = await bcrypt.hash(newUserData.password, 10)
      return newUserData
    },
    beforeUpdate: async (updatedUserData) => {
      updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
      return updatedUserData
    }
  },
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'Auth'
})
export const AuthModel = model('Auth', Auth)
// module.exports = {Auth};
