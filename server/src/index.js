// import { ApolloServer, startStandaloneServer, gql } from 'apollo-server';
import { ApolloServer } from 'apollo-server'
import { typeDefs, resolver } from '../src/typeDef-Resolvers/index.js'
// import { resolvers } from '../src/typeDef-Resolvers/index.js'

// const server = new startStandaloneServer({ typeDefs, resolvers });
const server = new ApolloServer(typeDefs, resolver)

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
