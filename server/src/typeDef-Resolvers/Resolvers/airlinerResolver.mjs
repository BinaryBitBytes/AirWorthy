import { default as AirlinerModel } from '../../models/Airliner.mjs'
import bcrypt from 'bcrypt'

export const airlinerResolvers = {
  Query: {
    airliner: async (_, { _id }) => {
      return AirlinerModel.findOne({ _id })
    },
    airliners: async (_, { airlinerName }) => {
      return AirlinerModel.find({ airlinerName }).sort({ createdAt: -1 })
    }
  },
  Mutation: {
    addAirliner: async (_, { airlinerName, isAdmin, modelAircraft, username, email, password }) => {
      const newAirliner = new AirlinerModel({
        airlinerName,
        isAdmin,
        modelAircraft,
        userName: username,
        email,
        password
      })

      newAirliner.password = await bcrypt.hash(password, 10)

      await newAirliner.save()

      return newAirliner
    },
    removeAirliner: async (_, { _id }) => {
      await AirlinerModel.findOneAndDelete({ _id })
      return true
    }
  }
}
