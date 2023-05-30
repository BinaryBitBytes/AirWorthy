// const { ApolloServer, gql } = require('apollo-server');
import pkg from 'apollo-server';
const { gql, makeExecutableSchema } = pkg;

export const typeDef = gql`
type projectData {
    _id: ID!
    projectId: Int
    projectName: String
    inspectorName: String
    workDescription: String
  }
` ;
console.log(typeDef);

export const resolvers = {
  Project_Data: {
    Query:
    {
      projectsData: async () => {
        return await Project.find().sort({ createdAt: -1 }); //! added await
      },

      project: async (parent, { projectID }) => {
        return await Project.findOne({ _id: projectID }); //! added await
      },
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
          workDescription,
        });
      },
      addInspector: async (parent, { projectID, inspectorName }) => {
        return Manager.findOneAndUpdate(
          { _id: projectID },
          {
            $addToSet: { workDescription: { inspectorName } },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      },
      removeProject_Data: async (parent, { projectID }) => {
        return Project_Data.fineOneAndDelete({ _id: projectID });
      },
      removeProject_Data: async (parent, { projectID, workDescription }) => {
        return Project_Data.destroy({ _id: projectID }, {});
      },
    },
  }
};
const schema = makeExecutableSchema({
  typeDef,
  resolvers,
});
const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
};
addSchemaLevelResolveFunction(schema, rootResolveFunction)
console.log(resolvers.Project_Data.Query.project);
// module.exports = {typeDef, resolvers}