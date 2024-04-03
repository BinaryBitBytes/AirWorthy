// import '../../server/config/.env'
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
// Access the MongoDB URI from the environment variable
const mongodbURI = "mongodb+srv://127.0.0.1/AirWorthy_DB";

// Use the `mongodbURI` variable in your code to connect to MongoDB
async function CON(response) {
  console.log(mongodbURI);
  return new Promise(function (resolve, reject) {
    console.log("starting connection");
    if (reject === true) {
      message: `CON rejected`;
    } else {
      resolve(
        mongoose.connect(
          `MongoDB is connecting to + ${mongodbURI} using the async CON fn`,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        )
      );
    }
  });
}

async function connectDB() {
  console.log("awaiting connection in connection.mjs on connectDB()");
  await CON();
  return new Promise(
    function (resolve, reject) {
      console.log("starting connection");
    }
    // .then()=>{
    //   console.log(`Connected to MongoDB at ${mongodbURI}`);
    //  }
  );
}

console.log(connectDB());
