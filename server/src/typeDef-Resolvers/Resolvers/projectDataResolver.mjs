import { default as ProjectDataModel } from '../../models/ProjectData.mjs'

export const resolver = {
  ProjectData: {
    Query:
    {
      projectData: async () => {
        return await ProjectDataModel.find().sort({ createdAt: -1 }) //! added await
      },

      project: async (parent, { projectID }) => {
        return await ProjectDataModel.findOne({ _id: projectID }) //! added await
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
        return ProjectDataModel.fineOneAndDelete({ _id: projectID })
      },
      removeProject_Data: async (parent, { projectID, workDescription }) => {
        return ProjectDataModel.destroy({ _id: projectID }, {});
      }
    }
  }
}
export default resolver
