import mongoose from "mongoose";

export const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Mognodb connected succesfully: ${conn.connection.host}`);
    
  } catch (error){
      console.log(`Mongodb connection error: ${error}`);
  }
}