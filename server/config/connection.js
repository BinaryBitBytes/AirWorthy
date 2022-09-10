const mongoose = require('mongoose');

Mongoose().catch(err => console.log(err));

async function Mongoose(){
  await mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/AirWorthy_DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})};

module.exports = Mongoose.connect;