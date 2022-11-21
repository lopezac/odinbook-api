import dotenv from "dotenv";
import express from "express";
import request from "supertest";
dotenv.config();

import MongoServer from "../configs/db.config";
import data from "../data";
import authRouter from "../../../src/routes/auth.route";
import friendReqRouter from "../../../src/routes/friendRequest.route";
import User from "../../../src/models/user.model";
import Friendship from "../../../src/models/friendship.model";
import FriendRequest from "../../../src/models/friendRequest.model";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/friend-requests", friendReqRouter);
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

  // create friendrequests
  const users = await User.find({}).exec();
  await FriendRequest.create({ emitter: users[0]._id, receiver: users[1]._id });

  const { email, password } = data.users[0];
  const res = await request(app).post("/sign-in").send({ email, password });
  token = res.body.token;
});

describe("friend-requests", () => {
  test("throws error if not authenticated at auth endpoints", (done) => {
    request(app).delete("/friend-requests/5T").expect(401, done);
  });

  test("create friend request works", async () => {
    const users = await User.find({});
    const emitter = users[0]._id;
    const receiver = users[1]._id;
    await request(app)
      .post("/friend-requests")
      .set("Authorization", `Bearer ${token}`)
      .send({ emitter, receiver })
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        const friendReq = await FriendRequest.findOne({ _id: res.body._id });
        if (!friendReq) return;
        expect(friendReq.emitter).toBe(emitter.toString());
        expect(friendReq.receiver).toBe(receiver.toString());
      });
  });

  test("delete friend request works", async () => {
    const friendReq = await FriendRequest.findOne({});
    if (!friendReq) return;
    await request(app)
      .del(`/friend-requests/${friendReq._id}`)
      .set("Authorization", `Bearer ${token}`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        const foundFriendReq = await FriendRequest.findOne({
          _id: friendReq._id,
        });
        expect(foundFriendReq).toBeFalsy();
      });
  });

  test("accept friend request works", async () => {
    const friendReq = await FriendRequest.findOne({});
    if (!friendReq) return;
    const { emitter, receiver } = friendReq;
    await request(app)
      .post(`/friend-requests/${friendReq._id}`)
      .set("Authorization", `Bearer ${token}`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        const foundFriendReq = await FriendRequest.findOne({
          _id: friendReq._id,
        });
        expect(foundFriendReq).toBeFalsy();
        const friendship = await Friendship.findOne({
          users: { $in: [emitter, receiver] },
        });
        if (!friendship) return;
        expect(friendship.users.length).toBe(2);
        expect(friendship.users.includes(emitter)).toBe(true);
        expect(friendship.users.includes(receiver)).toBe(true);
      });
  });
});
