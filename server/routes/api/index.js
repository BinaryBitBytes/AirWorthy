// Import the two parts of a GraphQL schema
import { ApolloServer } from 'apollo-server-express';
// import { typeDefs }  from '../../schemas/typeDefs.js';
// import { resolvers } from '../../schemas/resolvers.js';
import resolvers  from '../../schemas/index.js';
import typeDef  from '../../schemas/index.js';
//! commented out below on typedefs and resolvers on  5.20.23
// import { typeDef, resolvers } from './airlinerSchema';
// import { typeDef, resolvers } from '../../schemas/authSchema';
// import { typeDef, resolvers } from './inspectorSchema';
// import { typeDef, resolvers } from './managerSchema';
// import { typeDef, resolvers } from './projectDataSchema';
// import { typeDef ,resolvers } from './projectSchema';
// import { typeDef, resolvers } from './technicianSchema';
// import { authMiddleware } from '../../utils/auth.js';
// import { Airliner, Inspector, Manager, Project, Technician } from '../../models/index';

// Function to create a new instance of an apollo server
// const apiRoutes = () => {
export const server = new ApolloServer({
  typeDef,
  resolvers,
  context: authMiddleware,
});

  app.listen(PORT, () => console.log(`listening on port ${PORT}`)); // listening on port 3001 and logging it to the console

  app.get('/', (req, res) => {
    res.send({ express: 'Express Backend connected to react'});
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
    console.error('line 29 Throwing error for app.get');
  });

  // Create a new instance of an Apollo server with the GraphQL schema
  const startApolloServer = async (typeDef, resolvers) => {
    console.error('startApolloServer is throwing error in typeDefs and or resolvers');
    await server.start();
    console.error('await server.start throwing error')
    server.applyMiddleware({ app });
  }


  startApolloServer({typeDef}, {resolvers}); //! 5.15.23 destructured with {}
// }
// export default { apiRoutes };
export default {server, startApolloServer}