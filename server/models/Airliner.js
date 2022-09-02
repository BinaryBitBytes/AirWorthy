const mongoose = require("mongoose");

const { Schema } = mongoose;
// const airlinerSchema = new mongoose.Schema(
  const airlinerSchema = new Schema(
    {
        id: {
            type: Number,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        airlinerName: [{type: String, required: true}],
        isAdmin: {type: Boolean, enum:[true]},
        modelAircraft:[{type: String}],
        userName: String,
        email: String,
        password: String
    },
    {
        hooks: {
          beforeCreate: async (newAirlinerData) => {
            newAirlinerData.password = await bcrypt.hash(newAirlinerData.password, 10);
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
      }
);

module.exports = mongoose.model("Airliner", airlinerSchema);