import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import resolvers from './src/typeDef-Resolvers/Resolvers/resolvers.js'
import typeDefs from './src/typeDef-Resolvers/Schema/typeDef.js'
import { connectDB } from './config/connection.js'

// connecting to the mongo database
connectDB(
  console.log('connectdb server.js')
)
// Global function to start the server asynchronously
const startServer = async () => {
  console.log('started server')
  // This creates an Express application
  const app = express()
  console.log(`---logging app----`)
  console.log(app)
  // This creates the instance of the Apollo server with the typeDefs & resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  console.log(`---logging server----`)
  console.log(server)
  await server.start()
  console.log(console.log(`---logging await server.start()----`))
  console.log(await server.start())
  // This applies the Apollo Server Middleware into the Express application
  console.log(`----logging apply middleware -> app------`)
  server.applyMiddleware({ app })
  console.log(server.applyMiddleware({ app }))
  // This starts the server and listens on the respected port address
  app.listen({ port: 3069 }, () => {
    console.log(`The Apollo Server is running @ http://localhost:3069${server.graphqlPath}`)
  })
}
console.log(`---logging startServer----`)
console.log(startServer)
// Starting the Express Server with the Mongoose Database
startServer().catch((error) => console.log(error))
