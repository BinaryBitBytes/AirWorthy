const mongoose = require("mongoose");

const inspectorSchema = new mongoose.Schema(
    {

    },
);

module.exports = mongoose.model("Inspector", inspectorSchema);