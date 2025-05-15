 import mongoose from "mongoose";

 export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.BASE_URI);
      console.log(`MongoDB Connected`);
    } catch (error) {
      console.log("mongo db connection error",error)
    }
  };