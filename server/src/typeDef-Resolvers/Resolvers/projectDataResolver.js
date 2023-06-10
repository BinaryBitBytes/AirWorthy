import ProjectData from '../../models/ProjectData.js' // Import the Manager model
import authenticationUser from '../../../utils/middleware/auth.js'

export const resolver = {
  ProjectData: {
    Query:
    {
      projectData: async () => {
        return await ProjectData.find().sort({ createdAt: -1 }) //! added await
      },

      project: async (parent, { projectID }) => {
        return await ProjectData.findOne({ _id: projectID }) //! added await
      }
    },

    Mutation:
    {
      addProject_Data: async (
        parent,
        { projectId, projectName, inspectorName, workDescription }
      ) => {
        return Manager.create({
          projectId,
          projectName,
          inspectorName,
          workDescription
        })
      },
      addInspector: async (parent, { projectID, inspectorName }) => {
        return Manager.findOneAndUpdate(
          { _id: projectID },
          {
            $addToSet: { workDescription: { inspectorName } }
          },
          {
            new: true,
            runValidators: true
          }
        )
      },
      removeProject_Data: async (parent, { projectID }) => {
        return Project_Data.fineOneAndDelete({ _id: projectID })
      },
      removeProject_Data: async (parent, { projectID, workDescription }) => {
        return Project_Data.destroy({ _id: projectID }, {});
      }
    }
  }
}
export default resolver
