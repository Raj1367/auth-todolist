import mongoose from 'mongoose';

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('mongoDB connected.');
  } catch (error: any) {
    console.log(error || error.message);
  }
};

export default connectToDb;
