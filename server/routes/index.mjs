import { join } from 'path'
import server from './api/index.js'
//! ^problem 5.15.23 4:20 am // confirmed 5.16.23 1:36pm
// import { mongoose.connection } from '../config/connection.js';

//! --- commented this out 6.27.23
//! import express, { Router } from 'express'
import express from 'express';
const router = express.Router();

export default async function routes () {
  router.use('/api', server),
  // serve up react front-end in production
  router.use((req, res) => {
    res.sendFile(join(__dirname, '../../client/build/index.html'))
  })
}

// module.exports = (
//   routes
//   );
