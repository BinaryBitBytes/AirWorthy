// Import the two parts of a GraphQL schema
const express = require('express');
// const app = require('../../routes/index');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express'); //apollo-server-express
// const PORT = process.env.PORT || 3001;
const  {typeDefs}  = require('../../schemas');
const {resolvers}  = require('../../schemas');
const  mongoose   = require('../../config/connection');
const { authMiddleware } = require('../../utils/auth');
const http = require('http')
const { Airliner, Inspector, Manager, Project ,Technician } = require('../../models/index');

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  console.error('startApolloServer is throwing error in typeDefs and or resolvers');
  // await server.start();
  // const { url }= await server.listen();
  // console.log(`🚀 Server ready at ${url}`)
  console.error('await server.start throwing error')
  await server.start();
  server.applyMiddleware({app, path: '/'});
}


startApolloServer(typeDefs, resolvers);

// app.listen(PORT, () => console.log(`listening on port ${PORT}`));
// app.get('/', (req, res) => {
  //   res.send({ express: 'Express Backend connected to react'});
  //   res.sendFile(path.join(__dirname, '../client/build/index.html'));
  //   console.error('line 29 Throwing error for app.get');
  // });
  
  
  // Create a new instance of an Apollo server with the GraphQL schema
  // const startApolloServer = async (typeDefs, resolvers) => {