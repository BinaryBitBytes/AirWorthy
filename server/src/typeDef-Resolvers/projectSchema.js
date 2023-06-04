import pkg from 'apollo-server';
const { gql } = pkg;
import { makeExecutableSchema } from '@graphql-tools/schema'

export const typeDefs = gql`
    # //TODO need to add a real input type to project named projectInput and change project back to type project
input Project {
    _id: ID!
    projectName: String
    inspectorName: String
    workDescription: String
  }
`
console.log(typeDefs);

export const resolvers = {
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
          { _id: projectID },
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
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
};
// addSchemaLevelResolveFunction(schema, rootResolveFunction)
console.log(resolvers.Project.Query.projects);