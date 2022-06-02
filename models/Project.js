const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        projectName: [{type: String}],
        modelAircraft:[{type: Number}],

    },
);

module.exports = mongoose.model("Project", projectSchema);