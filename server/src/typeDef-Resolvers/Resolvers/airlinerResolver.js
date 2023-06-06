export const resolver = {
  Airliner: {
    Query: {
      airliner: async (parent, { _id }) => {
        // return AirlinerSchema.findOne({ _id: airlinerID }).populate("airliner"); //! added await
        return Airliner.findOne({ _id: airlinerID }).populate("airliner"); //! added await

      },
      airliners: async (parent, { airlinerName }) => {
        return Airliner.find().sort({ createdAt: -1 }).populate("airliner"); //! added await
      },

    },

    Mutation:
    {
      addAirliner: async (parent,
        { airlinerName, isAdmin, modelAircraft, username, email, password }
      ) => {
        const newAirliner = new Airliner({ airlinerName, isAdmin, modelAircraft, username, email, password });
        await newAirliner.build(airlinerName, username, email, password);
        await newAirliner.save();
        await newAirliner.populate("airliner");
      },
      addAirliner: async (parent, { airlinerID, airlinerName }) => {
        return airlinerID.findOneAndUpdate(
          { _id: airlinerID },
          {
            $addToSet: { airlinerName: { airlinerName } },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      },
      removeAirliner: async (parent, { airlinerID }) => {
        return airlinerID.fineOneAndDelete({ _id: airlinerID });
      },
      removeAirliner: async (parent, { airlinerID, airlinerName }) => {
        return airlinerID.destroy({ _id: airlinerID }, { airlinerName });
      },
    },
  }
};
// export default resolver;