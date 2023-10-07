// db/mongoose.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/eccomercenextjs', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
};

export default connectDB;