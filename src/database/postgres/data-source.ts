import { Environment } from '../../config/environment';
import {DataSource} from 'typeorm';

Environment.setup();

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [],
  subscribers: [],
  migrations: [__dirname + '/postgres/migrations/**/*.ts'],
})