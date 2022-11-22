import dotenv from "dotenv";
import express from "express";
import request from "supertest";
dotenv.config();

import MongoServer from "../configs/db.config";
import data from "../data";
import commentRouter from "../../../src/routes/comment.route";
import authRouter from "../../../src/routes/auth.route";
import Message from "../../../src/models/message.model";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/comments", commentRouter);
app.use("/", authRouter);

let token: string;
beforeAll(async () => await MongoServer.initialize());
afterEach(async () => await MongoServer.clear());
afterAll(async () => await MongoServer.close());
beforeEach(async () => {
  // create users
  for (const user of data.users) {
    await request(app).post("/sign-up").send(user);
  }

  const { email, password } = data.users[0];
  const res = await request(app).post("/sign-in").send({ email, password });
  token = res.body.token;
});

describe("messages", () => {
  test("create message works", async () => {
    const msgData = data.messages[0];

    await request(app)
      .post("/messages")
      .set("Authorization", `Bearer ${token}`)
      .send(msgData)
      .then(async (res) => {
        const msg = await Message.findOne({
          chat: msgData.chat,
          receiver: msgData.receiver,
          emitter: msgData.emitter,
        });
        if (!msg) return;

        expect(res.statusCode).toBe(200);
        expect(msg.chat.toString()).toStrictEqual(msgData.chat);
        expect(msg.receiver.toString()).toStrictEqual(msgData.receiver);
        expect(msg.emitter.toString()).toStrictEqual(msgData.emitter);
        expect(msg.text).toStrictEqual(msgData.text);
        expect(msg.created_at).toStrictEqual(new Date(msgData.created_at));
      });
  });

  test("delete message works", async () => {
    const msg = await Message.create(data.messages[1]);

    await request(app)
      .delete(`/messages/${msg._id}`)
      .set("Authorization", `Bearer ${token}`)
      .then(async (res) => {
        const msg = await Message.findById(msg._id);

        expect(res.statusCode).toBe(200);
        expect(msg).toBeFalsy();
      });
  });
});

