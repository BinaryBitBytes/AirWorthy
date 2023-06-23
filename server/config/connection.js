import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

// Access the MongoDB URI from the environment variable

// Use the `mongodbURI` variable in your code to connect to MongoDB
export const connectDB = async () => {
  try {
    const mongodbURI = process.env.MONGODB_URI;
    //await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/AirWorthy_DB ', {
    await mongoose.connect(mongodbURI , {
    // await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/AirWorthy_DB', { 
    // await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/AirWorthy_DB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log(`Connected to Mongoose at ${mongodbURI}`);
    })
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
  }
}
