import { default as AirlinerModel } from "../../models/Airliner.mjs";
import bcrypt from "bcrypt";

export const airlinerResolver = {
  Query: {
    airliner: async (_, { _id }) => {
      return AirlinerModel.findOne({ _id });
    },
    airliners: async (_, { airlinerName }) => {
      return AirlinerModel.find({ airlinerName }).sort({ createdAt: -1 });
    },
  },
  Mutation: {
    addAirliner: async (
      _,
      { airlinerName, isAdmin, modelAircraft, username, email, password }
    ) => {
      const newAirliner = new AirlinerModel({
        airlinerName,
        isAdmin,
        modelAircraft,
        userName: username,
        email,
        password,
      });

      newAirliner.password = await bcrypt.hash(password, 10);

      // await newAirliner.save();
      let airlinerSave = await newAirliner.password.save();
      console.log(`--------------------------------`);
      console.assert(airlinerSave);
      console.warn(airlinerSave);
      // return newAirliner;
      return airlinerSave && console.log(airlinerSave);
    },
    removeAirliner: async (_, { _id }) => {
      await AirlinerModel.findOneAndDelete({ _id });
      return true;
    },
  },
};

console.log(airlinerResolvers.Mutation);
