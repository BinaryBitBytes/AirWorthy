const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const {Airliner, Inspector, Manager, Project ,Technician} = require('./models/index');

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const ApolloServer = new ApolloServer({
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
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
app.get('/', (req, res) => {
  res.send({ express: 'Express Backend connected to react'});
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
  console.error('line 29 Throwing error for app.get');
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  console.error('startApolloServer is throwing error in typeDefs and or resolvers');
  await ApolloServer.start();
  console.error('await server.start throwing error')
  ApolloServer.applyMiddleware({ app });

db.once('open', () => {
  app.listen(PORT, () => {
    console.error('line 38 Throwing error for db connection');
    console.log(`API ApolloServer running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${ApolloServer.graphqlPath}`);
  })
})
};

startApolloServer(typeDefs, resolvers);
