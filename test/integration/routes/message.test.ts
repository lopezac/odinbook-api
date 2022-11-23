import dotenv from "dotenv";
import express from "express";
import request from "supertest";
dotenv.config();

import MongoServer from "../configs/db.config";
import data from "../data";
import messageRouter from "../../../src/routes/message.route";
import authRouter from "../../../src/routes/auth.route";
import Message from "../../../src/models/message.model";
import User from "../../../src/models/user.model";
import Chat from "../../../src/models/chat.model";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/messages", messageRouter);
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

  for (let i = 0; i < 3; i++) {
    const users = await User.find({});

    await Chat.create({ users: [users[0]._id, users[1]._id] });
  }

  const { email, password } = data.users[0];
  const res = await request(app).post("/sign-in").send({ email, password });
  token = res.body.token;
});

describe("messages", () => {
  test("create message works", async () => {
    const chat = await Chat.findOne({});
    const users = await User.find({});
    if (!chat) return;
    const msgData = {
      ...data.messages[0],
      chat: chat._id,
      emitter: users[0]._id,
      receiver: users[1]._id,
    };

    await request(app)
      .post("/messages")
      .set("Authorization", `Bearer ${token}`)
      .send(msgData)
      .then(async (res) => {
        const msg = await Message.findOne({
          chat: msgData.chat,
          receiver: msgData.receiver,
          emitter: msgData.emitter,
          text: msgData.text,
          created_at: msgData.created_at,
        });

        expect(msg).toBeTruthy();
        expect(res.statusCode).toBe(200);

        if (!msg) return;
        expect(msg.chat).toEqual(msgData.chat.toString());
        expect(msg.receiver).toEqual(msgData.receiver.toString());
        expect(msg.emitter).toEqual(msgData.emitter.toString());
        expect(msg.text).toEqual(msgData.text);
        expect(msg.created_at).toStrictEqual(new Date(msgData.created_at));
      });
  });

  test("delete message works", async () => {
    const message = await Message.findOne({});
    if (!message) return;

    await request(app)
      .del(`/messages/${message._id}`)
      .set("Authorization", `Bearer ${token}`)
      .then(async (res) => {
        const foundMessage = await Message.findById(message._id);

        expect(res.statusCode).toBe(200);
        expect(message).toBeTruthy();
        expect(foundMessage).toBeFalsy();
      });
  });
});
