import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import createError from "http-errors";
import logger from "morgan";
dotenv.config();

import indexRoute from "./routes/index";
import "./configs/db.config";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
