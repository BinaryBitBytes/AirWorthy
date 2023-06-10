import Technician from '../../model/Technician.js'
import { authenticationUser } from '../../../utils/middleware/auth.js'

export const resolver = {
  Technician: {
    Query:
    {
      technicians: async () => {
        return await Technician.find().sort({ createdAt: -1 })
      },

      technician: async (parent, { technicianID }) => {
        return await Technician.findOne({ _id: technicianID })
      }
    },

    Mutation:
    {
      addTechnician: async (
        parent,
        { technicianName, isAdmin, onProject, username, email, password },
        { req }
      ) => {
        // Using the req to check to see ig the user is authenticated
        authenticationUser(req)

        return Technician.create({
          technicianName,
          isAdmin,
          onProject,
          username,
          email,
          password
        })
      },
      addProject: async (parent, { technicianID, onProject }) => {
        return Technician.findOneAndUpdate(
          { _id: technicianID },
          {
            $addToSet: { project: { onProject } }
          },
          {
            new: true,
            runValidators: true
          }
        )
      },
      removeTechnician: async (parent, { technicianID }, { req }) => {
        // Using the req to check to see ig the user is authenticated
        authenticationUser(req)

        return Technician.fineOneAndDelete({ _id: technicianID })
      },
      removeTechnicianFromProject: async (parent, { technicianID, onProject }, { req }) => {
        // Using the req to check to see ig the user is authenticated
        authenticationUser(req)

        return Technician.destroy({ _id: technicianID }, {})
      }
    }
  }
}
export default resolver
