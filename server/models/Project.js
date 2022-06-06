const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        projectName: [{type: String}],
        workDescription:[{body: String}],
        startingDate: [{date: Date}],
        modelAircraft:[{type: Number}],

    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "project",
  }
);

module.exports = mongoose.model("Project", projectSchema);