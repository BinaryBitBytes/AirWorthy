const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema(
    {

    },
);

module.exports = mongoose.model("Manager", managerSchema);