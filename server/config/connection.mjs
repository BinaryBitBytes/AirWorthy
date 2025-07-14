// import '../../server/config/.env'
import dotenv from "dotenv";
//! import mongoose from "mongoose"; //?CM::{07.03.25}\/Maintaining MongoDB Standards\
import { MongoClient, ServerApiVersion } from "mongodb";
//! Changes to import of Line #3 above
const mongodbURI = "mongodb://127.0.0.1:27017/AirWorthy_DB";
const uri = process.env.ATLAS_URI || mongodbURI; //? Update the string value after the OR logic
//? to reflect the .env__PRODUCTION__ endpoint
dotenv.config();
// Access the MongoDB URI from the environment variable

// Use the `mongodbURI` variable in your code to connect to MongoDB
export const ClientConnectDB = new MongoClient(uri, {
  serverAPI: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
//*
try {
  // const mongodbURI =
  //   process.env.MONGODB_URI || "127.0.0.1:27017/AirWorthy_DB";
  // const mongodbURI = "mongodb://127.0.0.1:27017/AirWorthy_DB";
  // const mongodbURI = "mongodb+srv://127.0.0.1/AirWorthy_DB";

  console.log(
    $,
    { mongodbURI } +
      " " +
      ":: IS mongodbURI line 27 in server/config/connection.mjs"
  );
  console.warn("connection.mjs as per doce should be: connection.js");
  //! connecting the client to the server
  //.connect();
  //! sending a ping to confirm a sucessful connection
  await ClientConnectDB.connect(`${mongodbURI}`, {
    // await mongoose.createConnection(mongodbURI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log(`Connected to MongoDB at ${mongodbURI}`);
  });
} catch (error) {
  console.error("Failed to connect to MongoDB", error);
}
console.log(ClientConnectDB());
