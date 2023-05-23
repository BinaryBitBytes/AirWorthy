// Import the two parts of a GraphQL schema
import { ApolloServer } from 'apollo-server-express';
import express, { urlencoded, json } from 'express';
// var jwt = require('jsonwebtoken');;
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from '../../src/typeDef-Resolvers/index.js';
import typeDef from '../../src/typeDef-Resolvers/index.js';
import { types } from "util";
import { authMiddleware } from '../../utils/auth.js';
{// import { typeDefs }  from '../../schemas/typeDefs.js';
  // import { resolvers } from '../../schemas/resolvers.js';
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
  //!-----------------------------------------------------------------------------------$$$$$$------------------]]]]]
  //associating express with a app decleration
  //Creates an Express application. 
  //The express() function is a top-level function exported by the express module.
}
const PORT =3002;
const app = express();
// authMiddleware with express using json web tokes
  //! const authMiddleware = jwt({
  //!   secret: config.JWT_SECRET,
  //!  credentialsRequired: false,
  //! })
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.}
  export default async function server() {
    new ApolloServer({
      typeDef: types, //new property added //!5.21.23
      // typeDef: typeDef, //new property added //!5.21.23 // type or typeDef property?
      resolvers,
      playground: true, //new property added //!5.21.23
      context: authMiddleware,
      // context: ({ req }) => ({ //new property added //!5.21.23
      //   user: req.user, //new property added //!5.21.23
      // }),
    }); //new 1.15.23
    // applying middleware
    server.applyMiddleware({ //new added //!5.21.23
      app: app,
      path: '/',
    })
  }
  app.use(express.json()); //new added //!5.21.23
  app.use(authMiddleware); //new  added //!5.21.23
  {
    //! ****--------------------------Added 5.17.23--------------------------****
    // Passing an ApolloServer instance to the `startStandaloneServer` function:
    //  1. creates an Express app
    //  2. installs your ApolloServer instance as middleware
    //  3. prepares your app to handle incoming requests
    //!-----------------------------------------------------------------------------------^^^^^------------------]]]]]
    // const { url } = await startStandaloneServer(server, {
    //   listen: { port: 4000 },
    // });
    //! // // // // // // // // // const { url } = await ApolloServer(server, {
    //! // // // // // // // // //   listen: { port: 4000 },
    //! // // // // // // // // // });
    //! // // // // // // // // // console.log({url})
    //! // // // // // // // // // console.log(`🚀  Server ready at: ${url}`);
    // Function to create a new instance of an apollo server
    // const apiRoutes = () => {
    // export function server() { new ApolloServer({
    //   typeDef,
    //   resolvers,
    //   context: authMiddleware,
    // });
    // }
  }
  app.listen(PORT, () => console.log(`listening on port ${PORT}`)); // listening on port 3001 and logging it to the console

  app.get('/', (req, res) => {
    res.send({ express: 'Express Backend connected to react' });
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
    console.error('line 29 Throwing error for app.get');
  });

  // Create a new instance of an Apollo server with the GraphQL schema
  //*   export default async function startApolloServer {
  //*    async (typeDef, resolvers) => {
  //*   console.error('startApolloServer is throwing error in typeDefs and or resolvers');
  //*     await server.start();
  //*    console.error('await server.start throwing error')
  //*    server.applyMiddleware({ app });
  //*   }
  //* }

  server({ typeDef }, { resolvers }); //! 5.15.23 destructured with {}
//startApolloServer({typeDef}, {resolvers}); //! 5.15.23 destructured with {}
// }
// export default { apiRoutes };
// export default {server, startApolloServer}