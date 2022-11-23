import dotenv from "dotenv";
import express from "express";
import request from "supertest";
dotenv.config();

import MongoServer from "../configs/db.config";
import data from "../data";
import chatRouter from "../../../src/routes/chat.route";
import authRouter from "../../../src/routes/auth.route";
import Message from "../../../src/models/message.model";
import Chat from "../../../src/models/chat.model";
import User from "../../../src/models/user.model";
import { MessagesArray } from "../../../src/types/message.types";
import { createObjectId } from "../../../src/utils/mongoose.helper";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/chats", chatRouter);
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
    const users = await User.find({});
    const chat = await Chat.create({ users: [users[0]._id, users[1]._id] });

    for (let x = 0; x <= Math.round(Math.random() * 3); x++) {
      await Message.create({
        ...data.messages[x],
        receiver: users[0]._id,
        emitter: users[1]._id,
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
    const users = [createObjectId(1), createObjectId(2)];
    const chatData = { users: [users[0].toString(), users[1].toString()] };

    await request(app)
      .post("/chats")
      .set("Authorization", `Bearer ${token}`)
      .send(chatData)
      .then(async (res) => {
        const chat = await Chat.findOne({
          users: { $in: [users[0].toString(), users[1].toString()] },
        });

        expect(chat).toBeTruthy();
        expect(res.statusCode).toBe(200);

        if (chat) {
          expect(chat.users.length).toEqual(chatData.users.length);
          for (let i = 0; i < chat.users.length; i++) {
            expect(chat.users[i]).toEqual(chatData.users[i]);
          }
        }
      });
  });

  test("get chat messages works", async () => {
    const chat = await Chat.findOne({});
    if (!chat) return;
    const foundMessages = await Message.find({ chat: chat._id });

    await request(app)
      .get(`/chats/${chat._id}/messages`)
      .set("Authorization", `Bearer ${token}`)
      .then(async (res) => {
        const messages: MessagesArray = res.body;

        expect(res.statusCode).toBe(200);
        expect(messages.length).not.toBe(0);

        for (let i = 0; i < foundMessages.length; i++) {
          expect(foundMessages[i]._id.toString()).toStrictEqual(
            messages[i]._id
          );
          expect(foundMessages[i].emitter.toString()).toStrictEqual(
            messages[i].emitter
          );
          expect(foundMessages[i].receiver.toString()).toStrictEqual(
            messages[i].receiver
          );
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
        if (!foundChat) return;
        const foundMessages = await Message.find({ chat: foundChat._id });

        expect(res.statusCode).toBe(200);
        expect(foundChat).toBeFalsy();
        expect(foundMessages.length).toBe(0);
      });
  });
});
