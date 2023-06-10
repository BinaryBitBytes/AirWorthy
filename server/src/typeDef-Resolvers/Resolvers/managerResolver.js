import Manager from '../../models/Manager.js' // Import the Manager model
import authenticationUser from '../../../utils/middleware/auth.js'

export const resolver = {
  Manager: {
    Query: {
      managers: async () => {
        return await Manager.find().sort({ createdAt: -1 })
      },
      manager: async (parent, { managerID }) => {
        return await Manager.findOne({ _id: managerID })
      }
    },
    Mutation: {
      addManager: async (
        parent,
        { managerName, isAdmin, onProject, username, email, password }
      ) => {
        return Manager.create({
          managerName,
          isAdmin,
          onProject,
          username,
          email,
          password
        })
      },
      addProject: async (parent, { managerID, onProject }) => {
        return Manager.findOneAndUpdate(
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
        return Manager.findOneAndDelete({ _id: managerID })
      },
      removeProject: async (parent, { managerID, onProject }) => {
        const manager = await Manager.findOne({ _id: managerID })
        if (!manager) {
          throw new Error('Manager not found.')
        }
        manager.onProject = manager.onProject.filter((project) => project !== onProject)
        await manager.save()
        return manager
      }
    }
  }
}

export default resolver
