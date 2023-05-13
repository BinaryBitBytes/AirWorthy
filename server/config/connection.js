const mongoose = require('mongoose');

main().catch(err => console.log(err)) // added a catch error statement to log the error.

async function main(){
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/AirWorthy_DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} //! Updated 5.12.23 - encapsulated the mongoose.connection function asyncronously 
// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

module.exports = mongoose.connection;
module.exports = main; // updated 5.12.23, this function is to deplot mongoose asynchronously.
