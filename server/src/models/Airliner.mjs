import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const { model } = mongoose

const Airliner = new mongoose.Schema({
  id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  airlinerName: String,
  isAdmin: { type: Boolean, enum: [true] },
  modelAircraft: [String],
  userName: String,
  email: String,
  password: String
}, {
  hooks: {
    beforeCreate: async function (newAirlinerData) {
      newAirlinerData.password = await bcrypt.hash(newAirlinerData.password, 10)
      return newAirlinerData
    },
    beforeUpdate: async function (updatedAirlinerData) {
      updatedAirlinerData.password = await bcrypt.hash(updatedAirlinerData.password, 10)
      return updatedAirlinerData
    }
  },
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'Airliner'
})

const AirlinerModel = model('Airliner', Airliner)
export default AirlinerModel
