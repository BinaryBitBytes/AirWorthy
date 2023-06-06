export const resolver = {
  Manager: {
    Query:
    {
      managers: async () => {
        return await Manager.find().sort({ createdAt: -1 }); //! added await
      },

      manager: async (parent, { managerID }) => {
        return await Manager.findOne({ _id: managerID }); //! added await
      },
    },

    Mutation:
    {
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
          password,
        });
      },
      addProject: async (parent, { managerID, onProject }) => {
        return Manager.findOneAndUpdate(
          { _id: managerID },
          {
            $addToSet: { project: { onProject } },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      },
      removeManager: async (parent, { managerID }) => {
        return Manager.fineOneAndDelete({ _id: managerID });
      },
      removeManager: async (parent, { managerID, onProject }) => {
        return Manager.destroy({ _id: managerID }, {});
      },
    },
  }
};
export default resolver;