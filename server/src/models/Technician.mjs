import mongoose from "mongoose";
import bcrypt from "bcrypt";

class TechnicianModel {
  constructor() {
    this.schema = new mongoose.Schema(
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
          unique: true,
        },
        isAdmin: { type: Boolean, enum: [false] },
        onProject: [{ type: String }],
        email: String,
        userName: String,
        password: String,
      },
      {
        hooks: {
          beforeCreate: async (newTechnicianData) => {
            newTechnicianData.password = await bcrypt.hash(
              newTechnicianData.password,
              10
            );
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
        modelName: "Technician",
      }
    );
    this.model = mongoose.model("Technician", this.schema);
  }
}
console.log(`
  Console Log(typeof) ===  ${typeof TechnicianModel} 
-----------------
  Console.log(TechnicianModel)
  ${TechnicianModel}
------------
  `);
export default TechnicianModel;
