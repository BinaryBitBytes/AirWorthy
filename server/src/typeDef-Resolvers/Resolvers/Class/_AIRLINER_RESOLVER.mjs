// import { default as AirlinerModel } from "../../../models/Airliner.mjs";
import bcrypt from "bcrypt";
import { default as AirlinerModel } from "../../../models/Airliner.mjs";
import { default as mongoose } from "mongoose";
// class airlinerResolver(){
/**
 * airlinerResolver class contains GraphQL resolvers for Airliner-related queries and mutations.
 * It provides functionality to fetch, add, and remove airliners from the database.
 */
class AirlinerResolver {
  constructor(airlinerName, isAdmin, modelAircraft, username, email, password) {
    this.airlinerName = airlinerName;
    this.isAdmin = isAdmin;
    this.modelAircraft = modelAircraft;
    this.username = username;
    this.email = email;
    this.password = password;

    this.AIRLINER_RES_QUERY = {
      Query: {
        /**
         * Fetches a single airliner based on the provided ID.
         * @param {Object} _ - Not used.
         * @param {string} _id - The ID of the airliner to fetch.
         * @returns {Object} The fetched airliner document.
         */
        airliner: async (_, { _id }) => {
          return AirlinerModel.findOne({ _id });
        },

        /**
         * Fetches multiple airliners based on the provided airliner name.
         * @param {Object} _ - Not used.
         * @param {string} airlinerName - The name of the airliners to fetch.
         * @returns {Array} An array of fetched airliner documents.
         */
        airliners: async (_, { airlinerName }) => {
          return AirlinerModel.find({ airlinerName }).sort({ createdAt: -1 });
        },
      },

      Mutation: {
        /**
         * Adds a new airliner to the database.
         * @param {Object} _ - Not used.
         * @param {string} airlinerName - The name of the airliner.
         * @param {boolean} isAdmin - Indicates whether the airliner is an admin.
         * @param {string} modelAircraft - The model of the aircraft.
         * @param {string} username - The username for the airliner.
         * @param {string} email - The email of the airliner.
         * @param {string} password - The password for the airliner.
         * @returns {Object} The newly created airliner document.
         */
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

        /**
         * Removes an airliner from the database based on the provided ID.
         * @param {Object} _ - Not used.
         * @param {string} _id - The ID of the airliner to remove.
         * @returns {boolean} True if the airliner was successfully removed.
         */
        removeAirliner: async (_, { _id }) => {
          await AirlinerModel.findOneAndDelete({ _id });
          return true;
        },
      },
    };
  }
}
const AIRLINER_RES_QUERY = {
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
// return AIRLINER_RES_QUERY;

// const _AIRLINER_MODELED_ = mongoose.model("Airliner", {
// airlinerResolver: new airlinerResolver(),
// });
// console.table(_AIRLINER_MODELED_);
// console.warn(`Logging the resolver Query: ${airlinerResolver.Query}`);
console.warn(AirlinerResolver, 100);
export const CLASSFUL_resolver_AIRLINER = AirlinerResolver;
