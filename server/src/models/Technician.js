import pkg from 'mongoose';
const { model } = pkg;
import { resolvers } from "../src/schemas/technicianSchema.js";
const technician = { resolvers };
mdoel.technician = new technician({
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
  isAdmin: { type: Boolean, enum: [false] },
  onProject: [{ type: String }],
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
// console.log(technician)
export default model("Technician", technicianSchema);