// import pkg from 'mongoose'
// import { resolvers } from '../src/schemas/technicianSchema.js'
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const model = () => {
  return mongoose;
}; // const technician = { resolvers }
// model.technician = new Technician({
const Technician = new mongoose.Schema(
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
// console.log(technician)
// export default model('Technician', Technician)
const TechnicianModel = model("Technician", Technician);
export default TechnicianModel;
