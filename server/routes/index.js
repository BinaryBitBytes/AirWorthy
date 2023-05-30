import { join } from 'path';
import server from './api/index.js';
//! ^problem 5.15.23 4:20 am // confirmed 5.16.23 1:36pm
// import { mongoose.connection } from '../config/connection.js';
import express, {Router} from 'express';
// const router = require('express').Router();
// import express, {Router} from 'express';
// //! ^problem 5.15.23 4:20 am // confirmed 5.16.23 1:36pm
// const {router} = {express, Router}

export default async function routes() {

Router.use('/api', server),

// serve up react front-end in production
Router.use((req, res) => {
  res.sendFile(join(__dirname, '../../client/build/index.html'));
})
}

// module.exports = (
//   routes
//   );
