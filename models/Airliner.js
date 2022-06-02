const mongoose = require("mongoose");
const { STRING } = require("sequelize/types");

const airlinerSchema = new mongoose.Schema(
    {
        airlinerName: [{type: String}],
        isAdmin: true,
        modelAircraft:[{type: Number}],
    },
);

module.exports = mongoose.model("Airliner", airlinerSchema);