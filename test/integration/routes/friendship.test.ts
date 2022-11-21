import dotenv from "dotenv";
import express from "express";
import request from "supertest";
dotenv.config();

import MongoServer from "../configs/db.config";
import data from "../data";
import authRouter from "../../../src/routes/auth.route";
import friendshipRouter from "../../../src/routes/friendship.route";
import User from "../../../src/models/user.model";
import Friendship from "../../../src/models/friendship.model";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/friendships", friendshipRouter);
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

  // create friendships
  const users = await User.find({}).exec();
  await Friendship.create({ users: [users[0]._id, users[1]._id] });
  await Friendship.create({ users: [users[0]._id, users[2]._id] });

  const { email, password } = data.users[0];
  const res = await request(app).post("/sign-in").send({ email, password });
  token = res.body.token;
});

describe("friendships", () => {
  test("throws error if not authenticated at auth endpoints", (done) => {
    request(app).delete("/friendships/OEU573").expect(401, done);
  });

  test("delete friendship works", async () => {
    const friendship = await Friendship.findOne({});
    if (!friendship) return;

    await request(app)
      .delete(`/friendships/${friendship._id}`)
      .set("Authorization", `Bearer ${token}`)
      .then(async () => {
        const foundFriendship = await Friendship.findOne({
          _id: friendship._id,
        });
        expect(foundFriendship).toBeFalsy();
      });
  });
});
