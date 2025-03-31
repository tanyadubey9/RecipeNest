import mongoose from "mongoose";

let isConnected = false; // Track the connection status

const connectDB = async () => {

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`); // Log successful connection

  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
