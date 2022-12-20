import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import createError from "http-errors";
import logger from "morgan";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { registerMessageHandlers } from "./utils/message.handler";
import { registerNotificationHandlers } from "./utils/notification.handler";
dotenv.config();

import indexRoute from "./routes";
import "./configs/db.config";
import { createFakeUsers } from "./services/seeds.service";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const port = process.env.PORT;

const whiteList = [
  "http://localhost:3000",
  "https://www.facebook.com",
  "http://www.facebook.com",
];

const corsOptions: CorsOptions = {
  origin: function(origin, callback) {
    console.log("origin", origin);
    if (whiteList.indexOf(origin!) !== -1 || !origin) {
      return callback(null, true);
    }
    return callback(new Error("Origin not allowed by CORS"));
  },
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
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

const handleConnection = (socket) => {
  registerMessageHandlers(io, socket);
  registerNotificationHandlers(io, socket);
};

io.on("connection", handleConnection);

httpServer.listen(port, () => {
  if (process.env.NODE_ENV === "production") createFakeUsers();
});
