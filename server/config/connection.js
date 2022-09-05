const mongoose = require('mongoose');

let Mongoose = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/AirWorthy_DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {Mongoose};
