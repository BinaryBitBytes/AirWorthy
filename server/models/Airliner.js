const mongoose = require("mongoose");
"use strict";

const { Schema } = mongoose;
mongoose instanceof mongoose.Mongoose;

const { airlinerSchema } = new Schema({
  schema: {
    id: {
      type: Number,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    airlinerName: [{ type: String, required: true }],
    isAdmin: { type: Boolean, enum: [true] },
    modelAircraft: [{ type: String }],
    userName: String,
    email: String,
    password: String,
  },
  hooks: {
    beforeCreate: async (newAirlinerData) => {
      newAirlinerData.password = await bcrypt.hash(
        newAirlinerData.password,
        10
      );
      return newAirlinerData;
    },
    beforeUpdate: async (updatedAirlinerData) => {
      updatedAirlinerData.password = await bcrypt.hash(
        updatedAirlinerData.password,
        10
      );
      return updatedAirlinerData;
    },
  },
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "airliner",
});

module.exports = mongoose.model("Airliner", airlinerSchema);


// 'use strict';

// const mongoose = require("mongoose");
// mongoose instanceof mongoose.Mongoose;

// // const { Schema } = mongoose;
// // const airlinerSchema = new mongoose.Schema(
//   // const airlinerSchema = new Schema(
//     const airlinerSchema = new mongoose.Mongoose({
//     // module.exports = {
//     schema: {
//       id: {
//         type: Number,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       airlinerName: [{type: String, required: true}],
//       isAdmin: {type: Boolean, enum:[true]},
//       modelAircraft:[{type: String}],
//       userName: String,
//       email: String,
//       password: String
//     },
//       hooks: {
//         beforeCreate: async (newAirlinerData) => {
//           newAirlinerData.password = await bcrypt.hash(newAirlinerData.password, 10);
//           return newAirlinerData;
//         },
//         beforeUpdate: async (updatedAirlinerData) => {
//           updatedAirlinerData.password = await bcrypt.hash(
//             updatedAirlinerData.password,
//               10
//             );
//             return updatedAirlinerData;
//           },
//         },
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: "airliner",
//       });
//       // );
      
//       // // const Airliner = mongoose.model('Airliner', airlinerSchema) //added 09.12
//        module.exports = mongoose.model("Airliner", airlinerSchema);