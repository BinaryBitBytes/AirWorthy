import pkg from 'apollo-server';
const { gql, makeExecutableSchema } = pkg;

export const typeDef = gql`
    type Manager {
        _id: ID!
        managerName: String
        isAdmin: Boolean
        onProject: [Project]
        username: String!
        email: String
        password: String
  }
` ;
console.log(typeDef);

export const resolvers = {
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
const schema = makeExecutableSchema({
  typeDef,
  resolvers,
});
const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
};
addSchemaLevelResolveFunction(schema, rootResolveFunction)

console.log(resolvers);
console.log(resolvers.Manager.Query.managers);