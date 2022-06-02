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
        workDescription:[{ body: String, date: Date}],
        modelAircraft:[{type: Number}],

    },
);

module.exports = mongoose.model("Project", projectSchema);