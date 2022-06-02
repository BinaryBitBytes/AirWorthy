const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {

    },
);

module.exports = mongoose.model("Project", projectSchema);