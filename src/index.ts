import { Application } from "express";
import { Environment } from "./config/environment";
import PostgresDatabase from "./database/postgres";
import api from "./api";

Environment.setup();

async function connectPostgresDatabase() {
  await PostgresDatabase.setup();
}

async function startServerApi() {
  const app: Application = await api.startServer();
  app.listen(process.env.SERVER_PORT, () => {
    console.log(
      `Listening on  http://localhost:${process.env.SERVER_PORT} in ${process.env.NODE_ENV} mode`
    );
  });
}
connectPostgresDatabase();
startServerApi();