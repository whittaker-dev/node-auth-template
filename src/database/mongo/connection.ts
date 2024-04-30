import mongoose from "mongoose";
import { Environment } from "../../config/environment";

Environment.setup();

export const connectMongoose = async () => {
  try {
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_PORT, MONGODB_NAME } = process.env;
    console.log(`mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}?authSource=admin`);
    await mongoose.connect(`mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}?authSource=admin`);
  } catch (error) {
    throw error;
  }
};
