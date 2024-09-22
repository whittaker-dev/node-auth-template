import { Environment } from "../../config/environment";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Branding } from "./entities/branding.entity";
import { SubscriptionPlan } from "./entities/subscriptionPlan.entity";

Environment.setup();

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [
    User, 
    Branding, 
    SubscriptionPlan
  ],
  subscribers: [],
  migrations: [__dirname + "/migrations/**/*.ts"],
});
