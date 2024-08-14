import * as StartStandaloneServer from "@apollo/server/standalone.ts";
import * as typeDefs from "./src/typeDef-Resolvers/Schema/typeDef.mjs";
import { SCHEMA as resolvers } from "../server/src/typeDef-Resolvers/Resolvers/schema.mjs";
import * as apolloServer from "@apollo/server.ts";
const ApolloServer = { apolloServer };
const startStandaloneServer = { StartStandaloneServer };
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
//? Import schema typedefs below

//? Defined Data

//? Resolvers

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

console.log(server);
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
//? const { url } = await startStandaloneServer(server, {
//?   listen: { port: 4000 },
//? });

async function url({ url }) {
  return await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
}

console.log(`🚀  Server ready at: ${url}`);
