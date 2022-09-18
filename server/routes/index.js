// const router = require('express').Router();
const express = require('express');
const app = express();
const routes = express.Router();
require('dotenv').config();
const path = require('path');
const apiRoutes = require('./api');
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// serve up react front-end in production

app.get('/', (req, res) => {
  res.send({ express: 'Express Backend connected to react'});
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
  console.error('line 29 Throwing error for app.get');
});
// app.get('/api', apiRoutes);
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});


module.exports = { routes };
