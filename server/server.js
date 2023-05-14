import { graphql, buildSchema } from "graphql"; // added 5.13.23 sourced from graphql docs
// import express, { urlencoded, json, static } from 'express'; //!commented out 5.14.23 to remove static
//!Identifier expected. 'static' is a reserved word in strict mode. Modules are automatically in strict mode.ts(1214)
//!This is a built-in middleware function in Express. It serves static files and is based on serve-static.
import express, { urlencoded, json } from 'express';
import { ApolloServer } from 'apollo-server';
// // import typeDefs from './schemas';  //new 1.15.23
// // import resolvers from './schemas/resolvers'; //new 1.15.23
import { join } from 'path';
import { once } from './config/connection.js';
import routes from './routes/index.js'; //!5.14.24 added /index.js to path
import {typeDefs, resolvers} from './schemas/index.js'; //!5.14.24 added /index.js to path
const server = new ApolloServer({ typeDefs, resolvers }); //new 1.15.23

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

const app = express();
const PORT = process.env.PORT || 3001;


app.use(urlencoded({ extended: true }));
app.use(json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../client/build'))); //! 5.14.23 static by itself threw an error.
  //! used instead express.static per this source LinusU [https://github.com/standard/standard/issues/1279]
  console.error('line 22 Throwing error for node_env');
}

app.use(routes);

once('open', () => {
  app.listen(PORT, () => 
  {
    console.error('line 38 Throwing error for db connection');
    console.log(`API ApolloServer running on port ${PORT}!`);
  }
  )
  }
);

process.on('warning', (warning) => {
  console.log(warning.stack);
});

