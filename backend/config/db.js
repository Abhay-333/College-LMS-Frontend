import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function dbConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection successfull");
  } catch (err) {
    console.log("Database connection error: ", err);
  }
}