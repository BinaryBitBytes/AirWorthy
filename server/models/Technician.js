const mongoose = require("mongoose");
mongoose instanceof mongoose.Mongoose;
const technicianSchema = new mongoose.Mongoose(
  {
        id: {
            type: Number,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        technicianName: {
          type: String,
          required: true,
          unique: true
        },
        isAdmin: {type: Boolean, enum:[false]},
        onProject: [{type: String}],
        email: String,
        userName: String,
        password: String
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
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "technician",
      }
);

module.exports = mongoose.model("Technician", technicianSchema);