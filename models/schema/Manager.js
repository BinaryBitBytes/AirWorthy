const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        managerName: {type: String, required: true, unique: true},
        isAdmin: true,
        onProject: [{type: String}],
        
    },
);

module.exports = mongoose.model("Manager", managerSchema);