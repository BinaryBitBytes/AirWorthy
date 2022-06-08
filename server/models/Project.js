const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
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
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "project",
  }
);

module.exports = mongoose.model("Project", projectSchema);