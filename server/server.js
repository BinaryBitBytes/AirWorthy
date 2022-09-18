const express = require('express');
const {db} = require('./config/connection');
const path = require('path');
const { routes } = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  console.error('line 22 Throwing error for node_env');
}

app.use(routes);

// db.once('open', () => {
//   db.once('open', () => {
//   app.listen(PORT, () => {
//     console.error('line 38 Throwing error for db connection');
//     console.log(`API ApolloServer running on port ${PORT}!`);
//   })
// });
