const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema(
    {

    },
);

module.exports = mongoose.model("Technician", technicianSchema);