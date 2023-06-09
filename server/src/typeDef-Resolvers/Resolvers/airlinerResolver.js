export const resolver = {
  Query: {
    airliner: async (parent, { _id }) => {
      return Airliner.findOne({ _id }).populate("airliner");
    },
    airliners: async (parent, { airlinerName }) => {
      return Airliner.find().sort({ createdAt: -1 }).populate("airliner");
    },
  },
  Mutation: {
    addAirliner: async (
      parent,
      { airlinerName, isAdmin, modelAircraft, username, email, password }
    ) => {
      const newAirliner = new Airliner({
        airlinerName,
        isAdmin,
        modelAircraft,
        username,
        email,
        password,
      });
      await newAirliner.build(airlinerName, username, email, password);
      await newAirliner.save();
      await newAirliner.populate("airliner");
    },
    removeAirliner: async (parent, { _id }) => {
      return Airliner.findOneAndDelete({ _id });
    },
  },
};
export default resolver;