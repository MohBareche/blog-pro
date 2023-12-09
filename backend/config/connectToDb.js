import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB database ^_^");
  } catch (error) {
    console.log("Connection failed to MongoDB", error);
  }
};

export default connectDB;
