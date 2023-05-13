// const mongoose = require("mongoose"); uncommented 5/12/23 to test main
const mongoose = require("main");

const airlinerSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        airlinerName: [{type: String}],
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