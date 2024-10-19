import mongoose from "mongoose";
import { Environment } from "../../config/environment";

Environment.setup();

export const connectMongoose = async () => {
  try {
    await mongoose.connect(`mongodb://root:RaNdOMSt0nGP%40assW0rd@mongodb:27017/trysomethign-mongo-local?authSource=admin`);
  } catch (error) {
    throw error;
  }
};
