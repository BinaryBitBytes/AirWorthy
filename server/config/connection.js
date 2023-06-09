import pkg from 'mongoose'
import { config } from 'dotenv'
const { createConnection } = pkg
config()
export default function connection () {
  createConnection(
    (process.env.MONGODB_URI || 'mongodb://localhost:27017/AirWorthy_DB',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    )
  )
}
// export default connection;

// import {express} from 'express';
// import {router} from '../../routes/index.js';
// const once = () => {

// import { connect, connections } from 'mongoose';
// import pkg from 'mongoose';
// const { connect, connections } = pkg;
//! // // // const MAIN = async function main()
// // // //   {
// // // //     try {
// // // //       await pkg(process.env.MONGODB_URI || 'mongodb://localhost:27017/AirWorthy_DB',
// // // //         {
// // // //         useNewUrlParser: true,
// // // //         useUnifiedTopology: true,
// // // //         }
// // // //       );
// // // //     } catch (error) {
// // // //       console.log(error);
// // // //       handleError(error);
// // // //     }
// // // //   }
//! // // main().catch(err => console.log(err)) // added a catch error statement to log the error.
// }
//! Updated 5.12.23 - encapsulated the mongoose.connection function asyncronously
// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// export default connection;
// export  {MAIN}; // updated 5.12.23, this function is to deplot mongoose asynchronously.
