import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://117BBB117:U_o6innka@airworthy.r9anp.mongodb.net/', {
    // await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/AirWorthy_DB', {
    // await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/AirWorthy_DB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
  }
}
