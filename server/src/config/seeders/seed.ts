require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { runSeeders } from "typeorm-extension";
import { options } from "../database";

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
}).catch(err => `seed error: ${err}`);
