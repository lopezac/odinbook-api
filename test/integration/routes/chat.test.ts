
import dotenv from "dotenv";
import express from "express";
import request from "supertest";
dotenv.config();

import MongoServer from "../configs/db.config";
import data from "../data";
import commentRouter from "../../../src/routes/comment.route";
import authRouter from "../../../src/routes/auth.route";
import Message from "../../../src/models/message.model";
import Chat from "../../../src/models/chat.model";
import User from "../../../src/models/user.model";
import MessagesArray from "../../../src/types/messages.types.ts";

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

  for (let i = 0; i < 2; i++) {
    const user1 = await User.findOne({});
    const user2 = await User.findOne({});
    if (!user1 || !user2) return;

    const chat = await Chat.create({ users: [user1._id, user2._id] });

    for (let x = 0; x <= Math.round(Math.random() * 4); x++) {
      await Message.create({
        ...data.messages[x],
        receiver: user1._id,
        emitter: user2._id,
        chat: chat._id,
      });
    }
  }

  const { email, password } = data.users[0];
  const res = await request(app).post("/sign-in").send({ email, password });
  token = res.body.token;
});

describe("chats", () => {
  test("create chat works", async () => {
    const users = ["12345678901234567890abcd", "2a345678901234567890abcd"];
    const chatData = { users };

    await request(app)
      .post("/chats")
      .set("Authorization", `Bearer ${token}`)
      .send(chatData)
      .then(async (res) => {
        const chat = await Chat.findOne({
          users: { $in: [users[0], users[1]] }
        });
        if (!chat) return;

        expect(res.statusCode).toBe(200);
        expect(chat.users.length).toEqual(chatData.users.length);

        for (let i = 0; i < chat.users.length; i++) {
          expect(chat.users[i]).toEqual(chatData.users[i]);
        }
      });
  });

  test("get chat messages works", async () => {
    const chat = await Chat.findOne({});
    const foundMessages = await Message.find({ chat: chat._id });
    if (!chat) return;

    await request(app)
      .get(`/chats/${chat._id}/messages`)
      .set("Authorization", `Bearer ${token}`)
      .then(async (res) => {
        const { messages } = res.body as MessagesArray;

        expect(res.statusCode).toBe(200);
        expect(messages.length).not.toBe(0);

        for (let i = 0; i < foundMessages.length; i++) {
          expect(foundMessages[i]._id.toString()).toStrictEqual(messages[i]._id);
          expect(foundMessages[i].emitter.toString()).toStrictEqual(messages[i].emitter);
          expect(foundMessages[i].receiver.toString()).toStrictEqual(messages[i].receiver);
          expect(foundMessages[i].created_at).toStrictEqual(
            new Date(messages[i].created_at)
          );
          expect(foundMessages[i].text).toEqual(messages[i].text);
        }
      });
  });

  test("delete chat works", async () => {
    const chat = await Chat.findOne({});
    if (!chat) return;

    await request(app)
      .delete(`/chats/${chat._id}`)
      .set("Authorization", `Bearer ${token}`)
      .then(async (res) => {
        const foundChat = await Chat.findById(chat._id);
        const foundMessages = await Message.find({ chat: foundChat._id })

        expect(res.statusCode).toBe(200);
        expect(foundChat).toBeFalsy();
        expect(foundMessages.length).toBe(0);
      });
  });
});

