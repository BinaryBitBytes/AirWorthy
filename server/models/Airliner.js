const mongoose = require("mongoose");

const { STRING } = require("sequelize/types");

const airlinerSchema = new mongoose.Schema(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        airlinerName: [{type: String}],
        isAdmin: true,
        modelAircraft:[{type: Number}],
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
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "airliner",
      }
);

module.exports = mongoose.model("Airliner", airlinerSchema);