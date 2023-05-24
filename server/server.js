import { graphql, buildSchema } from "graphql"; // added 5.13.23 sourced from graphql docs
// import express, { urlencoded, json, static } from 'express'; //!commented out 5.14.23 to remove static
//!Identifier expected. 'static' is a reserved word in strict mode. Modules are automatically in strict mode.ts(1214)
//!This is a built-in middleware function in Express. It serves static files and is based on serve-static.
import express, { urlencoded, json } from 'express';
import jsonToken from 'jsonwebtoken';
var jwt = jsonToken;
// import jToken from 'express-jwt';
// const {express: jwt} = jToken;
import pkg from "express-jwt";
const { expressjwt, ExpressJwtRequest, } = pkg; 
import { ApolloServer } from 'apollo-server-express';
import { startStandaloneServer } from '@apollo/server/standalone';
import { join } from 'path';
import { MAIN } from './config/connection.js';
import routes from './routes/index.js'; //!5.14.24 added /index.js to path
import {resolvers}  from './src/typeDef-Resolvers/index.js';
import typeDef  from './src/typeDef-Resolvers/index.js';
import { types } from "util";


async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  server.applyMiddleware({ app });

  app.use((req, res) => {
    res.status(200);
    res.send('Hello!');
    res.end();
  });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}
//associating express with a app decleration
//Creates an Express application. 
//The express() function is a top-level function exported by the express module.
const app = express();
// authMiddleware with express using json web token
//! jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
//!   console.log(token);
//! });
// const GetVerificationKey(req: express.Request, token: jwt.Jwt | undefined){Promise<jwt.Secret>};
const authMiddleware = expressjwt({
  // secret: config.JWT_SECRET,
  secret: expressjwt(jwt.Secret | GetVerificationKey), //!<------
  credentialsRequired: false,
})
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
export default async function server() {
  new ApolloServer({ 
    typeDef: types, //new property added //!5.21.23
    // typeDef: typeDef, //new property added //!5.21.23 // type or typeDef property?
    resolvers,
    playground: true, //new property added //!5.21.23
    context: ({ req }) => ({ //new property added //!5.21.23
      user: req.user, //new property added //!5.21.23
    }),
  }); //new 1.15.23
// applying middleware
server.applyMiddleware({ //new added //!5.21.23
  app: app,
  path: '/',
})
app.use(express.json()); //new added //!5.21.23
app.use(authMiddleware); //new  added //!5.21.23

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
var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello: () => {
    return "Hello world!"
  },
}

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: "{ hello }",
  rootValue,
}).then(response => {
  console.log(response)
})  //! End of the graphql server.js setup added 5.13.23


//New 1.15.23 setup for apollo server
//!
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
//!

const PORT = process.env.PORT || 3001;
app.use(urlencoded({ extended: true }));
app.use(json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../client/build'))); //! 5.14.23 static by itself threw an error.
  //! used instead express.static per this source LinusU [https://github.com/standard/standard/issues/1279]
  console.error('line 22 Throwing error for node_env');
}
app.use(routes);
MAIN('open', () => {
  app.listen(PORT, () => 
  {
    console.error('line 38 Throwing error for db connection');
    console.log(`API ApolloServer running on port ${PORT}!`);
  }
  )
}
);
}

process.on('warning', (warning) => {
  console.log(warning.stack);
});

