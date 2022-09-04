// Import the two parts of a GraphQL schema
require('dotenv').config();
const { ApolloServer } = require('apollo-server'); //apollo-server-express
const { typeDefs, resolvers } = require('../../schemas');

const { authMiddleware } = require('../../utils/auth');
const { Airliner, Inspector, Manager, Project ,Technician } = require('../../models/index');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
app.get('/', (req, res) => {
  res.send({ express: 'Express Backend connected to react'});
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
  console.error('line 29 Throwing error for app.get');
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  console.error('startApolloServer is throwing error in typeDefs and or resolvers');
  await server.start();
  console.error('await server.start throwing error')
  server.applyMiddleware({ app });
}


startApolloServer(typeDefs, resolvers);
