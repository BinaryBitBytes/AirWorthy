import express, { urlencoded, json } from 'express';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
// import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import http from 'http';
import { ApolloServer } from 'apollo-server';
import { graphql, buildSchema } from "graphql"; // added 5.13.23 sourced from graphql docs
import pkg from "express-jwt";
const { expressjwt, ExpressJwtRequest, } = pkg;
import path, { join } from 'path';
import { authMiddleware } from './utils/middleware/auth.cjs';
// import { MAIN } from './config/connection.js';
// const db = mongoose.connection;
import db from './config/connection.js';
import routes from './routes/index.js'; //!5.14.24 added /index.js to path
import { resolvers } from './src/typeDef-Resolvers/resolvers.js';
import { typeDef } from './src/typeDef-Resolvers/typeDef.js';
import { types } from "util";
import { application } from './src/typeDef-Resolvers/module/createApplication.js';

const schema = application.createApolloExecutor();
const PORT = process.env.PORT || 3001;
const app = express();
const typesArray = loadFilesSync(path.join(__dirname, '.'), { extensions: ['gql'] });
const typeDefs = mergeTypeDefs(types);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
/*
! @BinaryBitBytes
//**
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../client/build'))); //! 5.14.23 static by itself threw an error.
  //! used instead express.static per this source LinusU [https://github.com/standard/standard/issues/1279]
  console.error('line 27 Throwing error for node_env');
}

app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, "../client/build")) //! removed /index.html
});
//*
!
*/
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};
startApolloServer(typeDef, resolvers);
//----------------------------------correct up to here ^^ 5.26.23----------------------
//TODO Below is reserved for suture use------------ @BinaryBitBytes
/*
async function startApolloServer(typeDef, resolvers) {
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: schema,
    typeDefs: typeDef,
    resolvers: resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    // context: authMiddleware
  });
  console.log(server);
  await server.start();
  server.applyMiddleware({ app });
  console.log(server.applyMiddleware({ app }));
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};
TODO End of Reserve -------------------------------^^^^^
*/

// Call the async function to start the server
  //!---- Commented below, may be contamination  ----
  // app.use((req, res) => {
  //   res.status(200);
  //   res.send('Hello!');
  //   res.end();
  // });

  // await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  // console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  // return { server, app };
// }
//associating express with a app decleration
//Creates an Express application.
//The express() function is a top-level function exported by the express module.
// authMiddleware with express using json web token
//! jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
//!   console.log(token);
//! });
// const GetVerificationKey(req: express.Request, token: jwt.Jwt | undefined){Promise<jwt.Secret>};
// const authMiddleware = expressjwt(
//   {
//   // secret: config.JWT_SECRET,
//     secret: expressjwt(jwt.Secret),
//     // | GetVerificationKey), //!<------ work on developing a GetVerificationKey for a JSON Web Token.
//     credentialsRequired: false,
//   }
// )
// console.log(authMiddleware);
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
// export default async function server() {
//   new ApolloServer({
//     typeDef: types, //new property added //!5.21.23
//     // typeDef: typeDef, //new property added //!5.21.23 // type or typeDef property?
//     resolvers,
//     playground: true, //new property added //!5.21.23
//     context: ({ req }) => ({ //new property added //!5.21.23
//       user: req.user, //new property added //!5.21.23
//     }),
//   }); //new 1.15.23
//   console.log(ApolloServer);
// applying middleware
// server.applyMiddleware({ //new added //!5.21.23
//   app: app,
//   path: '/',
// }
// )
// app.use(authMiddleware); //new  added //!5.21.23
// console.log(server.applyMiddleware)
// app.use(express.json()); //new added //!5.21.23
// console.log(app.use(express.json()))
// console.log(app.use(authMiddleware))

//! ****--------------------------Added 5.17.23--------------------------****
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
// });
// console.log(`🚀  Server ready at: ${url}`);
//!^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//! Start of the graphql server.js setup added 5.13.23
// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `)

// The rootValue provides a resolver function for each API endpoint
// var rootValue = {
//   hello: () => {
//     return "Hello world!"
//   },
// }

// Run the GraphQL query '{ hello }' and print out the response
// graphql({
//   schema,
//   source: "{ hello }",
//   rootValue,
// }).then(response => {
//   console.log(response)
// })  //! End of the graphql server.js setup added 5.13.23


//New 1.15.23 setup for apollo server
//!
// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });
// //!

// app.use(routes);
// MAIN('open', () => {
//   app.listen(PORT, () =>
//   {
//     console.error('line 38 Throwing error for db connection');
//     console.log(`API ApolloServer running on port ${PORT}!`);
//   }
//   )
// }
// );
// }
// console.log(server);
// console.log(startApolloServer);

// process.on('warning', (warning) => {
//   console.log(warning.stack);
// });

// console.log(process.on);

