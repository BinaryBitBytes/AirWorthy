const mongoose = require("mongoose");

const airlinerSchema = new mongoose.Schema(
    {

    },
);

module.exports = mongoose.model("Airliner", airlinerSchema);