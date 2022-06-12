const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const {Airliner, Manager, Inspector, Technician, Project} = require('./models/index');

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  console.error('line 22 Throwing error for node_env');
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
  console.error('line 29 Throwing error for app.get');
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  console.error('startApolloServer is throwing error in typeDefs and or resolvers');
  await server.start();
  console.error('await server.start throwing error')
  server.applyMiddleware({ app });

db.once('open', () => {
  app.listen(PORT, () => {
    console.error('line 38 Throwing error for db connection');
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
})
};

startApolloServer(typeDefs, resolvers);
