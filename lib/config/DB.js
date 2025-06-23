import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);
  console.log("MongoDB Connected");
};

export default connectDB;
