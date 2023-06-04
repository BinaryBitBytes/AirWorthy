import pkg from 'apollo-server';
const { gql } = pkg;
import { makeExecutableSchema } from '@graphql-tools/schema'


export const typeDefs = gql`
    # //TODO need to add a real input type to projectData named projectDataInput and change auth back to type projectData
input ProjectData {
    _id: ID!
    projectId: Int
    projectName: String
    inspectorName: String
    workDescription: String
  }
` ;
console.log(typeDefs);

export const resolvers = {
  ProjectData: {
    Query:
    {
      projectData: async () => {
        return await ProjectData.find().sort({ createdAt: -1 }); //! added await
      },

      project: async (parent, { projectID }) => {
        return await ProjectData.findOne({ _id: projectID }); //! added await
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
  typeDefs,
  resolvers,
});
const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
};
// addSchemaLevelResolveFunction(schema, rootResolveFunction)
