var { graphql, buildSchema } = require("graphql") // added 5.13.23 sourced from graphql docs
const express = require('express');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schemas');  //new 1.15.23
const resolvers = require('./schemas/resolvers'); //new 1.15.23
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
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


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  console.error('line 22 Throwing error for node_env');
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => 
  {
    console.error('line 38 Throwing error for db connection');
    console.log(`API ApolloServer running on port ${PORT}!`);
  }
  )
  }
);

