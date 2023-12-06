// import '../../server/config/.env'
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
// Access the MongoDB URI from the environment variable

// Use the `mongodbURI` variable in your code to connect to MongoDB
export const connectDB = async () => {
  try {
    // const mongodbURI =
    //   process.env.MONGODB_URI || "127.0.0.1:27017/AirWorthy_DB";
    const mongodbURI = "mongodb://127.0.0.1:27017/AirWorthy_DB";

    console.log(mongodbURI);
    mongoose
      .connect(`${mongodbURI}`, {
        // await mongoose.createConnection(mongodbURI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(`Connected to MongoDB at ${mongodbURI}`);
      });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

// console.log(connectDB());
