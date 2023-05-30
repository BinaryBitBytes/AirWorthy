import pkg from 'apollo-server';
const { gql } = pkg;
import { makeExecutableSchema } from '@graphql-tools/schema'


export const typeDefs = gql`
type Inspector {
    _id: ID!
    inspectorName: String
    isAdmin: Boolean
    onProject: [Project]
    username: String!
    email: String
    password: String
  }
`;
console.log(typeDefs);

export const resolvers = {
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
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
};
addSchemaLevelResolveFunction(schema, rootResolveFunction)
console.log(resolvers.Inspector.Query.addProject);
console.log(resolvers.Inspector.Mutation);