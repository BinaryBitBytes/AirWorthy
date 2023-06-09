export const resolver = {
  Query: {
    inspectors: async () => {
      return await Inspector.find().sort({ createdAt: -1 });
    },

    inspector: async (parent, { inspectorID }) => {
      return await Inspector.findOne({ _id: inspectorID });
    },
  },

  Mutation: {
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
        { $addToSet: { onProject: onProject } },
        { new: true, runValidators: true }
      );
    },

    removeInspector: async (parent, { inspectorID }) => {
      return Inspector.findOneAndDelete({ _id: inspectorID });
    },

    removeProject: async (parent, { inspectorID, onProject }) => {
      return Inspector.updateOne(
        { _id: inspectorID },
        { $pull: { onProject: onProject } }
      );
    },
  },
};

export default resolver;