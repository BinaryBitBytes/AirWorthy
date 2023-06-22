import { default as TechnicianModel } from '../../models/Technician.js'
export const resolver = {
  Technician: {
    Query:
    {
      technicians: async () => {
        return await TechnicianModel.find().sort({ createdAt: -1 }) // .cursor(); //added .cursor to see if this resolves //! added await
      },

      technician: async (parent, { technicianID }) => {
        return await TechnicianModel.findOne({ _id: technicianID }) // .cursor(); //added .cursor to see if this resolves //! added await
      }
    },

    Mutation:
    {
      addTechnician: async (
        parent,
        { technicianName, isAdmin, onProject, username, email, password }
      ) => {
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
        return TechnicianModel.findOneAndUpdate(
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
      removeTechnician: async (parent, { technicianID }) => {
        return TechnicianModel.fineOneAndDelete({ _id: technicianID })
      },
      removeTechnician: async (parent, { technicianID, onProject }) => {
        return TechnicianModel.destroy({ _id: technicianID }, {})
      }
    }
  }
}
export default resolver
