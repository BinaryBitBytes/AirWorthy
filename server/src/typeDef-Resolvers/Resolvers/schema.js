import { ApolloServer, gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { merge } from 'lodash';

// Import resolvers from schema files
import { resolvers as airlinerResolvers } from './airlinerSchema.js';
import { resolvers as authResolvers } from './authSchema.js';
import { resolvers as inspectorResolvers } from './inspectorSchema.js';
import { resolvers as managerResolvers } from './managerSchema.js';
import { resolvers as projectDataResolvers } from './projectDataSchema.js';
import { resolvers as projectResolvers } from './projectSchema.js';
import { resolvers as technicianResolvers } from './technicianSchema.js';

// Define the root resolvers
const rootResolvers = {
  Query: {},
};

// Define the executable schema
const schema = makeExecutableSchema({
  typeDefs: [Airliner, Auth, Inspector, Manager, ProjectData, Project, Technician], // Add the correct typeDefs here
  resolvers: merge(
    rootResolvers,
    airlinerResolvers,
    authResolvers,
    inspectorResolvers,
    managerResolvers,
    projectDataResolvers,
    projectResolvers,
    technicianResolvers
  ),
});

// Create an Apollo Server instance
const server = new ApolloServer({
  schema,
  // ... other Apollo Server options if needed
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});



// import pkg from 'lodash';
// import { ApolloServer, gql } from 'apollo-server';
// import { makeExecutableSchema } from '@graphql-tools/schema';
// import { resolvers as airlinerResolvers } from './airlinerSchema.js';
// import { resolvers as authResolvers } from './authSchema.js';
// import { resolvers as inspectorResolvers } from './inspectorSchema.js';
// import { resolvers as managerResolvers } from './managerSchema.js';
// import { resolvers as projectDataResolvers } from './projectDataSchema.js';
// import { resolvers as projectResolvers } from './projectSchema.js';
// import { resolvers as technicianResolvers } from './technicianSchema.js';
// const { merge } = pkg;
// const resolvers = {
//   Query: {
//   }
// };

// const SCHEMAex = () => { 
//   makeExecutableSchema({
//     // typeDefs: [Query, Airliner, Auth, Inspector, Manager, ProjectData, Project, Technician],
//     typeDefs: [Airliner, Auth, Inspector, Manager, ProjectData, Project, Technician],
//     // resolvers: merge(resolvers, airlinerResolvers, authResolvers, inspectorResolvers, managerResolvers, projectDataResolvers, projectResolvers, technicianResolvers),
//     resolvers: merge(airlinerResolvers, authResolvers, inspectorResolvers, managerResolvers, projectDataResolvers, projectResolvers, technicianResolvers),

//   });
// }
// const rootResolveFunction = (parent, args, context, info) => {
//   //perform action before any other resolvers
// };