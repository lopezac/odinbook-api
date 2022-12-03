import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import createError from "http-errors";
import logger from "morgan";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";
dotenv.config();

import indexRoute from "./routes/index";
import { db } from "./configs/db.config";

const app = express();
const port = process.env.PORT;

const whiteList = ["http://localhost:3000"];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin!) !== -1) {
      return callback(null, true);
    }
    return callback(new Error("Origin not allowed by CORS"));
  },
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(logger("dev"));

app.use("/", indexRoute);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = err; // do in production show nothing

  res.status(err.status || 500);
  res.send(err);
});

app.listen(port);
