import pkg from 'mongoose'
import bcrypt from 'bcrypt'
// import { resolvers } from "../typeDef-Resolvers/inspectorSchema.js"
const { Schema, model } = pkg

const inspectorSchema = new Schema(
  {
    id: {
      type: Number,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    inspectorName: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, enum: [true] },
    onProject: [{ type: String }],
    userName: String,
    email: String,
    password: String
  },
  {
    hooks: {
      beforeCreate: async (newInspectorData) => {
        newInspectorData.password = await bcrypt.hash(newInspectorData.password, 10)
        return newInspectorData
      },
      beforeUpdate: async (updatedInspectorData) => {
        updatedInspectorData.password = await bcrypt.hash(updatedInspectorData.password, 10)
        return updatedInspectorData
      }
    },
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Inspector'
  }
)

export const InspectorModel = model('Inspector', inspectorSchema)

// export const inspectorResolvers = {
//   Query: {
//     inspector: async (_, { _id }) => {
//       return InspectorModel.findOne({ _id });
//     },
//     inspectors: async () => {
//       return InspectorModel.find().sort({ createdAt: -1 });
//     },
//   },
//   Mutation: {
//     addInspector: async (_, { inspectorName, isAdmin, onProject, userName, email, password }) => {
//       const newInspector = new InspectorModel({
//         inspectorName,
//         isAdmin,
//         onProject,
//         userName,
//         email,
//         password,
//       });

//       newInspector.password = await bcrypt.hash(password, 10);

//       await newInspector.save();

//       return newInspector;
//     },
//     removeInspector: async (_, { _id }) => {
//       await InspectorModel.findOneAndDelete({ _id });
//       return true;
//     },
//   },
// };

// export default inspectorResolvers;
