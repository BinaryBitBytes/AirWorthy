import { default as InspectorModel } from '../../models/Inspector.js'

export const resolvers = {
  Query: {
    inspectors: async () => {
      return await InspectorModel.find().sort({ createdAt: -1 })
    },
    inspector: async (parent, { inspectorID }) => {
      return await InspectorModel.findOne({ _id: inspectorID })
    }
  },
  Mutation: {
    addInspector: async (
      parent,
      { inspectorName, isAdmin, onProject, username, email, password }
    ) => {
      return InspectorModel.create({
        inspectorName,
        isAdmin,
        onProject,
        username,
        email,
        password
      })
    },
    addProject: async (parent, { inspectorID, onProject }) => {
      return InspectorModel.findOneAndUpdate(
        { _id: inspectorID },
        { $addToSet: { onProject: onProject } },
        { new: true, runValidators: true }
      )
    },
    removeInspector: async (parent, { inspectorID }) => {
      return InspectorModel.findOneAndDelete({ _id: inspectorID })
    },
    removeProject: async (parent, { inspectorID, onProject }) => {
      return InspectorModel.updateOne(
        { _id: inspectorID },
        { $pull: { onProject: onProject } }
      )
    }
  }
}
