import dotenv from "dotenv";
import express from "express";
import request from "supertest";
dotenv.config();

import MongoServer from "../configs/db.config";
import data from "../data";
import likeRouter from "../../../src/routes/like.route";
import authRouter from "../../../src/routes/auth.route";
import User from "../../../src/models/user.model";
import Post from "../../../src/models/post.model";
import Like from "../../../src/models/like.model";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/likes", likeRouter);
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

  // create posts and comments
  for (let i = 0; i < data.posts.length; i++) {
    const user = await User.findOne({}).exec();
    if (!user) return;

    const post = await Post.create({ ...data.posts[i], user: user._id });
  }

  const { email, password } = data.users[0];
  const res = await request(app).post("/sign-in").send({ email, password });
  token = res.body.token;
});

describe("likes", () => {
  test("create like works", async () => {
    const post = await Post.findOne();
    const user = await User.findOne();
    if (!post || !user) return;

    await request(app)
      .post("/likes")
      .set("Authorization", `Bearer ${token}`)
      .send({ receiver: post._id, user: user._id })
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        const postLikes = await Like.count({
          receiver: post._id,
          user: user._id,
        });
        expect(postLikes).toBeTruthy();
        expect(postLikes).toEqual(1);
      });
  });

  test("delete like works", async () => {
    const post = await Post.findOne();
    const user = await User.findOne();
    if (!post || !user) return;
    const likeOne = await Like.create({
      user: user._id,
      receiver: post._id,
      text: "shiro ishii",
    });
    const likeTwo = await Like.create({
      user: user._id,
      receiver: post._id,
      text: "squad 731",
    });

    await request(app)
      .delete(`/likes/${likeOne._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ receiver: post._id, user: user._id })
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        const postLikes = await Like.count({
          receiver: post._id,
          user: user._id,
        });
        const likeOneFound = await Like.findById(likeOne._id);
        const likeTwoFound = await Like.findById(likeTwo._id);
        expect(postLikes).toBeTruthy();
        expect(postLikes).toEqual(1);
        expect(likeOneFound).toBeFalsy();
        expect(likeTwoFound).toBeTruthy();
      });
  });
});
