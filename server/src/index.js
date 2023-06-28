// import { ApolloServer, startStandaloneServer, gql } from 'apollo-server';
import { ApolloServer } from 'apollo-server'
import typedefs, { resolver } from '../src/typeDef-Resolvers/index.js'
// import { resolvers } from '../src/typeDef-Resolvers/index.js'

// const server = new startStandaloneServer({ typeDefs, resolvers });
const server = new ApolloServer(typedefs, resolver)

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
