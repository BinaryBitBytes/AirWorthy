export const resolver = {
  Query: {
    projects: async () => {
      return await Project.find().sort({ createdAt: -1 });
    },
    project: async (parent, { projectID }) => {
      return await Project.findOne({ _id: projectID });
    },
  },
  Mutation: {
    addProject: async (
      parent,
      { projectName, isAdmin, onProject, username, email, password }
    ) => {
      return Project.create({
        projectName,
        isAdmin,
        onProject,
        username,
        email,
        password,
      });
    },
    updateProject: async (parent, { projectID, onProject }) => {
      return Project.findOneAndUpdate(
        { _id: projectID },
        {
          $addToSet: { onProject },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeProject: async (parent, { projectID }) => {
      return Project.findOneAndDelete({ _id: projectID });
    },
    removeTechnician: async (parent, { projectID, technicianID }) => {
      return Project.findOneAndUpdate(
        { _id: projectID },
        {
          $pull: { onProject: technicianID },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
  },
};

export default resolver;


// export const resolver = {
//   Project: {
//     Query:
//     {
//       projects: async () => {
//         return await Project.find().sort({ createdAt: -1 }); //! added await
//       },

//       project: async (parent, { projectID }) => {
//         return await Project.findOne({ _id: projectID }); //! added await
//       },
//     },

//     Mutation:
//     {
//       addProject: async (
//         parent,
//         { projectName, isAdmin, onProject, username, email, password }
//       ) => {
//         return Project.create({
//           projectName,
//           isAdmin,
//           onProject,
//           username,
//           email,
//           password,
//         });
//       },
//       addProject: async (parent, { projectID, onProject }) => {
//         return Project.findOneAndUpdate(
//           { _id: projectID },
//           {
//             $addToSet: { project: { onProject } },
//           },
//           {
//             new: true,
//             runValidators: true,
//           }
//         );
//       },
//       removeProject: async (parent, { projectID }) => {
//         return Project.fineOneAndDelete({ _id: projectID });
//       },
//       removeTechnician: async (parent, { projectId, onProject }) => {
//         return Project.destroy({ _id: projectId }, {});
//       },
//     },
//   }
// };
// export default resolver;