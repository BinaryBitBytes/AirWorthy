// server.mjs
import { config } from "dotenv";
import nodeFetchFetcher from "node-fetch";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginUsageReporting } from "@apollo/server/plugin/usageReporting";
import { ApolloServerPluginSchemaReporting } from "@apollo/server/plugin/schemaReporting";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ClientConnectDB } from "./config/connection.mjs";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import http from "http";
import resolvers from "./src/typeDef-Resolvers/Resolvers/resolvers.mjs";
import typeDefs from "./src/typeDef-Resolvers/Schema/typeDef.mjs";
import { mergeTypeDefs } from "@graphql-tools/merge";
config();

const app = express();
const httpServer = http.createServer(app);

// Create Apollo Server instance (factory)
const createApolloServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginUsageReporting({ fetcher: nodeFetchFetcher }),
      ApolloServerPluginSchemaReporting({ fetcher: nodeFetchFetcher }),
    ],
    introspection: process.env.NODE_ENV !== "production",
    debug: process.env.NODE_ENV !== "production",
  });
};

// Main startup
async function startServer() {
  try {
    // 1. Connect to DB
    await ClientConnectDB();

    // 2. Create and START Apollo Server
    const apolloServer = createApolloServer();
    await apolloServer.start(); // ← REQUIRED

    // 3. Apply middleware AFTER start
    app.use(
      helmet(),
      cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }),
      express.json(),
      expressMiddleware(apolloServer) // ← Pass the STARTED instance
    );

    // 4. Health check
    app.get("/health", (req, res) => {
      res.status(200).json({ status: "OK", uptime: process.uptime() });
    });

    // 5. Start HTTP server
    const PORT = process.env.PORT || 3069;
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🚀 Health check: http://localhost:${PORT}/health`);
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

// Start the server
startServer();
