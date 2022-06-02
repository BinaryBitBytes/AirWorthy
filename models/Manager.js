const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema(
    {
        managerName: {type: String, required: true, unique: true},
        isAdmin: true,
        onProject: [{type: String}],
        
    },
);

module.exports = mongoose.model("Manager", managerSchema);