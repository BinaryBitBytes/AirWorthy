export const resolver = {
  Inspector: {
    Query:
    {
      inspectors: async () => {
        return await Technician.find().sort({ createdAt: -1 }); //! added await
      },

      inspector: async (parent, { inspectorID }) => {
        return await Technician.findOne({ _id: inspectorID }); //! added await
      },
    },

    Mutation:
    {
      addInspector: async (
        parent,
        { inspectorName, isAdmin, onProject, username, email, password }
      ) => {
        return Inspector.create({
          inspectorName,
          isAdmin,
          onProject,
          username,
          email,
          password,
        });
      },
      addProject: async (parent, { inspectorID, onProject }) => {
        return Inspector.findOneAndUpdate(
          { _id: inspectorID },
          {
            $addToSet: { project: { onProject } },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      },
      removeInspector: async (parent, { inspectorID }) => {
        return Inspector.fineOneAndDelete({ _id: inspectorID });
      },
      removeInspector: async (parent, { inspectorID, onProject }) => {
        return Inspector.destroy({ _id: inspectorID }, {});
      },
    },
  }
};
export default resolver;