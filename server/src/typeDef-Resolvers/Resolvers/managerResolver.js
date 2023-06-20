import { ManagerModel } from '../../models/Manager.js' // Import the Manager model

export const resolver = {
  Query: {
    managers: async () => {
      return await ManagerModel.find().sort({ createdAt: -1 })
    },
    manager: async (parent, { managerID }) => {
      return await ManagerModel.findOne({ _id: managerID })
    }
  },
  Mutation: {
    addManager: async (
      parent,
      { managerName, isAdmin, onProject, username, email, password }
    ) => {
      return ManagerModel.create({
        managerName,
        isAdmin,
        onProject,
        username,
        email,
        password
      })
    },
    addProject: async (parent, { managerID, onProject }) => {
      return ManagerModel.findOneAndUpdate(
        { _id: managerID },
        {
          $addToSet: { onProject }
        },
        {
          new: true,
          runValidators: true
        }
      )
    },
    removeManager: async (parent, { managerID }) => {
      return ManagerModel.findOneAndDelete({ _id: managerID })
    },
    removeProject: async (parent, { managerID, onProject }) => {
      const manager = await ManagerModel.findOne({ _id: managerID })
      if (!manager) {
        throw new Error('Manager not found.')
      }
      manager.onProject = manager.onProject.filter((project) => project !== onProject)
      await manager.save()
      return manager
    }
  }
}

export default resolver
