import mongoose from "mongoose";
import { _conf } from "./config";

const connectDB = async (): Promise<void> => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("connected to db Successfully");
    });
    mongoose.connection.on("error", (err) =>
      console.log(`Failed to connect: ${err}`)
    );
    await mongoose.connect(_conf.mongoUri as string);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
