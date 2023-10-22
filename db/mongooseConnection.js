import mongoose from "mongoose";
import dotenv from 'dotenv'

// Dotenv configuration
dotenv.config()


// Env variables
const userName = process.env.DB_USERNAME || ''
const password = process.env.DB_PASSWORD || ''
const cluster = process.env.DB_CLUSTER || ''
const dbName= process.env.DB_NAME || ''

// cloud db url
const mongoCloudUrl = `mongodb+srv://${userName}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`

// local db url
const local = 'mongodb://localhost:27017/task21-day32'


// Connection
export const connectToDb = async () => {
  try {
    await mongoose.connect(mongoCloudUrl, {
      useNewUrlParser: true,
    });
    console.log("Db connected successfully");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
