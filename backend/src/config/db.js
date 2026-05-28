import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection established successfully.");
    });

    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB connection disconnected.");
    });

    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(`MongoDB initial connection error: ${error.message}`);
    console.warn("Express server will remain running, but database operations will fail.");
  }
};

export default connectDB;
