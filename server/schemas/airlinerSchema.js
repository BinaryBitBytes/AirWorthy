export const typeDef = `
    type Airliner {
        _id: ID!
        airlinerName: String
        isAdmin: Boolean
        modelAircraft: [String]
        username: String!
        email: String
        password: String
  }
` ;

export const resolvers = {
  Airliner: {
    Query: 
    {
      airliners: async () => {
        return await Airliner.find().sort({ createdAt: -1 }); //! added await
      },

      airliner: async (parent, { airlinerID }) => {
        return await Airliner.findOne({ _id: airlinerID }); //! added await
      },
    },

    Mutation: 
    {
      addAirliner: async (parent,
        { airlinerName, isAdmin, modelAircraft, username, email, password }
      ) => {
        return Airliner.create(
          {
          airlinerName,
          isAdmin,
          modelAircraft,
          email,
          username,
          password,
          }
        );
      },
      addAirliner: async (parent, { airlinerID, airlinerName }) => 
      {
        return Airliner.findOneAndUpdate(
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
      removeAirliner: async (parent, { airlinerID }) => 
        {
          return Airliner.fineOneAndDelete({ _id: airlinerID });
        },
      removeAirliner: async (parent, { airlinerID, airlinerName }) => 
        {
          return Airliner.destroy({ _id: airlinerID }, { airlinerName });
        },
    },
  }
};