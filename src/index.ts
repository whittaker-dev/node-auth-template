import { Application } from "express";
import { Environment } from "./config/environment";
import PostgresDatabase from "./database/postgres";
import MongoDatabase from "./database/mongo";
import api from "./api";

Environment.setup();

async function connectPostgresDatabase() {
  await PostgresDatabase.setup();
}

async function connectMongoDatabase() {
  await MongoDatabase.setup();
}

async function startServerApi() {
  const app: Application = await api.startServer();
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on  http://localhost:${process.env.SERVER_PORT} in ${process.env.NODE_ENV} mode`);
  });
}
connectMongoDatabase();
connectPostgresDatabase();
startServerApi();
