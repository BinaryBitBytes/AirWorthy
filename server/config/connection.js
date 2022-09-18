const mongoose = require('mongoose');
require('dotenv').config();
const db = mongoose.connection;
const PORT = 27017;
//!Importing Models
const { Airliner } = require('../models/Airliner');
// Mongoose().catch(err => console.log(err));
//! Step 1 Mongoose connection = mongoose.connect(''mongodb://username:password@host:port/database?options...'')
 mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/AirWorthy_DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//! Step 2 Mongoose Operation Buffering Model
const TestAirliner = mongoose.Airliner('Test', new Airliner({
  airlinerName: String }));
TestAirliner.findOne(function(err, res) { /* ... */});
setTimeout(function() {
  mongoose.connect('mongodb://localhost:27017/myapp');
}, 60000);
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  app.listen(PORT, () => {
    console.error('line 38 Throwing error for db connection');
    console.log(`API ApolloServer running on port ${PORT}!`);
  })
});

module.exports = mongoose.connect;


// async function db(){
//   await mongoose.connect(
//   process.env.MONGODB_URI || 'mongodb://localhost:27017/AirWorthy_DB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })};