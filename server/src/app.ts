require("dotenv").config();

import express from "express";
import * as bodyParser from "body-parser";
import * as paginate from "express-paginate";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import { dataSource } from "./config/database";
import appRoutes from "@/controllers/index";
import ErrorHandler from "@/utils/error-handler";

dataSource.initialize().then(() => {
  console.log("Database connected");
});

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(paginate.middleware(10, 100));

appRoutes.map((route) => {
  app.use("/api/", route);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.use(ErrorHandler.handle());

app.listen(process.env.API_PORT);
