const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { Airliner, Inspector, Manager, Project, Technician } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
 //schema1,
 //schema2,
});