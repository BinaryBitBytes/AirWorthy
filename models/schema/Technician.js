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
    {
        hooks: {
          beforeCreate: async (newTechnicianData) => {
            newTechnicianData.password = await bcrypt.hash(newTechnicianData.password, 10);
            return newTechnicianData;
          },
          beforeUpdate: async (updatedTechnicianData) => {
            updatedTechnicianData.password = await bcrypt.hash(
              updatedTechnicianData.password,
              10
            );
            return updatedTechnicianData;
          },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "technician",
      }
);

module.exports = mongoose.model("Technician", technicianSchema);