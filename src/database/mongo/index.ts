import { connectMongoose } from "./connection";

interface IMongooseDatabase {
  setup(): Promise<void>;
}

class MongoDatabase implements IMongooseDatabase {
  async setup(): Promise<void> {
    try {
      await connectMongoose();
      console.log("🔥🔥 Mongo database has been connected successfully 🔥🔥");
    } catch (error) {
      console.log(`Connect to database mongoose fail`, error);
    }
  }
}

export default new MongoDatabase();
