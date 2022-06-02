const mongoose = require("mongoose");

const inspectorSchema = new mongoose.Schema(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        inspectorName: {type: String, required: true, unique: true},
        isAdmin: true,
        onProject: [{type: String}],
    },
);

module.exports = mongoose.model("Inspector", inspectorSchema);