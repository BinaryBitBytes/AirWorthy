const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        technicianName: {type: String, required: true, unique: true},
        isAdmin: false,
        onProject: [{type: String}],
    },
);

module.exports = mongoose.model("Technician", technicianSchema);