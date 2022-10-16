import mongoose from "mongoose";

export const connectDB = async () => {

  try {
    if (process.env.MONGO_URI) {
      const connect: typeof mongoose = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${connect.connection.host}`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}