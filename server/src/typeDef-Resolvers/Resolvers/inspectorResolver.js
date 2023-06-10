import { InspectorModel } from '../../models/Inspector.js'
import authenticationUser from '../../../utils/middleware/auth.js'

export const resolvers = {
  Inspector: {
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
          { $addToSet: { onProject } },
          { new: true, runValidators: true }
        )
      },
      removeInspector: async (parent, { inspectorID }) => {
        return InspectorModel.findOneAndDelete({ _id: inspectorID })
      },
      removeProject: async (parent, { inspectorID, onProject }) => {
        return InspectorModel.updateOne(
          { _id: inspectorID },
          { $pull: { onProject } }
        )
      }
    }
  }
}
