import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const { model } = mongoose

const Manager = new mongoose.Schema(
  {
    id: {
      type: Number,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    managerName: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, enum: [true] },
    onProject: [{ type: String }],
    userName: String,
    email: String,
    password: String
  },
  {
    hooks: {
      beforeCreate: async function (newManagerData) {
        newManagerData.password = await bcrypt.hash(newManagerData.password, 10)
        return newManagerData
      },
      beforeUpdate: async function (updatedManagerData) {
        updatedManagerData.password = await bcrypt.hash(updatedManagerData.password, 10)
        return updatedManagerData
      }
    },
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Manager'
  }
)

const ManagerModel = model('Manager', Manager)
export default ManagerModel
