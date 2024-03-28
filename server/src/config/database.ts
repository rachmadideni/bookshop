import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { BookFactory } from "./factories/book.factory";
import { CustomerFactory } from "./factories/customer.factory";
import { MainSeeder } from "./seeders/main.seeder";
import path from "path";

export const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [path.join(__dirname + "/../entities/*.{ts,js}")],
  logging: true,
  synchronize: false,
  factories: [BookFactory, CustomerFactory],
  seeds: [MainSeeder],
};

export const dataSource = new DataSource(options);
