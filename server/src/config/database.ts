import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { BookFactory } from "./factories/book.factory";
import { CustomerFactory } from "./factories/customer.factory";
import { MainSeeder } from "./seeders/main.seeder";

export const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: "localhost",
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + "/../entities/*.{ts,js}"],
  logging: true,
  synchronize: process.env.NODE_ENV === "development",
  factories: [BookFactory, CustomerFactory],
  seeds: [MainSeeder],
};

export const dataSource = new DataSource(options);
