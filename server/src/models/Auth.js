// Resolvers > Models > Schema
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const { model } = mongoose
// import { AuthTypeDefs } from "../typeDef-Resolvers/authSchema.js";

const Auth = new mongoose.Schema({
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
const AuthModel = model('Auth', Auth)
export default AuthModel
