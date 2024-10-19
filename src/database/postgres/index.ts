import { PostgresDataSource } from "./data-source";

interface IPostgresDatabase {
  setup(): Promise<void>;
}

class PostgresDatabase implements IPostgresDatabase {
  async setup(): Promise<void> {
    try {
      await PostgresDataSource.initialize();
      console.log("🔥🔥 Postgres database has been connected successfully 🔥🔥");
    } catch (error) {
      console.log(`Connect to database fail`, error);
    }
  }
}

export default new PostgresDatabase();
