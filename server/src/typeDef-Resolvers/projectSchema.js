const { ApolloServer, gql } = require('apollo-server');

export const typeDef = gql`
type Project {
    _id: ID!
    projectName: String
    inspectorName: String
    workDescription: String
  }
` 
export const resolvers =  {
  Project: {
    Query: 
    {
      projects: async () => {
        return await Project.find().sort({ createdAt: -1 }); //! added await
      },

      project: async (parent, { projectID }) => {
        return await Project.findOne({ _id: projectID }); //! added await
      },
    },

    Mutation: 
    {
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
      addProject: async (parent, { projectID, onProject }) => {
        return Project.findOneAndUpdate(
          { _id:projectID },
          {
            $addToSet: { project: { onProject } },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      },
      removeProject: async (parent, { projectID }) => {
        return Project.fineOneAndDelete({ _id: projectID });
      },
      removeTechnician: async (parent, { projectId, onProject }) => {
        return Project.destroy({ _id: projectId }, {});
      },
    },
  }
};

// module.exports = {typeDef, resolvers}