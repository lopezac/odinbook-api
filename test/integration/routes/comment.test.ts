import dotenv from "dotenv";
import express from "express";
import request from "supertest";
dotenv.config();

import MongoServer from "../configs/db.config";
import data from "../data";
import commentRouter from "../../../src/routes/comment.route";
import authRouter from "../../../src/routes/auth.route";
import User from "../../../src/models/user.model";
import Post from "../../../src/models/post.model";
import Comment from "../../../src/models/comment.model";
import Like from "../../../src/models/like.model";

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

  // create posts and comments
  for (let i = 0; i < data.posts.length; i++) {
    const user = await User.findOne({}).exec();
    if (!user) return;

    const post = await Post.create({ ...data.posts[i], user: user._id });
    const comment = await Comment.create({
      ...data.comments[i],
      user: user._id,
      post: post._id,
    });

    for (let i = 0; i <= Math.round(Math.random() * 5); i++) {
      await Like.create({ receiver: comment._id, user: user._id });
    }

    await Comment.create({
      ...data.comments[i],
      post: post._id,
      user: user._id,
    });
  }

  const { email, password } = data.users[0];
  const res = await request(app).post("/sign-in").send({ email, password });
  token = res.body.token;
});

describe("comments", () => {
  test("create comment works", async () => {
    const user = await User.findOne();
    const post = await Post.findOne();
    if (!user || !post) return;
    const commentData = {
      user: user._id,
      post: post._id,
      text: "Comment textoo",
      created_at: "1999-01-01",
    };

    await request(app)
      .post("/comments")
      .set("Authorization", `Bearer ${token}`)
      .send(commentData)
      .then(async (res) => {
        const foundComment = await Comment.findOne({
          text: "Comment textoo",
          created_at: "1999-01-01",
        });
        if (!foundComment) return;

        expect(res.statusCode).toBe(200);
        expect(foundComment.text).toEqual(commentData.text);
        expect(foundComment.created_at).toStrictEqual(
          new Date(commentData.created_at)
        );
        expect(foundComment.user).toStrictEqual(user._id.toString());
      });
  });

  test("update comment works", async () => {
    const comment = await Comment.findOne();
    const updateData = {
      text: "another comment tex",
      created_at: "1955-02-02",
    };
    if (!comment) return;

    await request(app)
      .put(`/comments/${comment._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateData)
      .then(async (res) => {
        const foundComment = await Comment.findById(comment._id);
        if (!foundComment) return;

        expect(res.statusCode).toBe(200);
        expect(foundComment.text).toBe(updateData.text);
        expect(foundComment.created_at).toStrictEqual(
          new Date(updateData.created_at)
        );
        expect(foundComment.user).toStrictEqual(comment.user);
        expect(foundComment.post).toStrictEqual(comment.post);
      });
  });

  test("delete comment works", async () => {
    const comment = await Comment.findOne();
    if (!comment) return;

    await request(app)
      .del(`/comments/${comment._id}`)
      .set("Authorization", `Bearer ${token}`)
      .then(async (res) => {
        const foundComment = await Comment.findById(comment._id);
        const foundLikes = await Like.count({ receiver: comment._id });

        expect(res.statusCode).toBe(200);
        expect(foundComment).toBeFalsy();
        expect(foundLikes).toBeFalsy();
      });
  });

  test("get comment likes works", async () => {
    const comment = await Comment.findOne({});
    if (!comment) return;
    const commentLikes = await Like.count({ receiver: comment._id });

    await request(app)
      .get(`/comments/${comment._id}/likes`)
      .then(async (res) => {
        const likes: number = res.body.likes;
        expect(res.statusCode).toBe(200);
        expect(likes).toBeTruthy();
        expect(likes).toEqual(commentLikes);
      });
  });
});
