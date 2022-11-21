import dotenv from "dotenv";
import express from "express";
import request from "supertest";
dotenv.config();

import MongoServer from "../configs/db.config";
import data from "../data";
import postRouter from "../../../src/routes/post.route";
import authRouter from "../../../src/routes/auth.route";
import User from "../../../src/models/user.model";
import Post from "../../../src/models/post.model";
import Comment from "../../../src/models/post.model";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/posts", postRouter);
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

  // create posts
  for (const postData of data.posts) {
    const user = await User.findOne({}).exec();
    if (!user) return;
    const post = new Post({ ...postData, user: user._id });
    await post.save();
  }

  // create comments
  for (const comment of data.comments) {
  }

  const { email, password } = data.users[0];
  const res = await request(app).post("/sign-in").send({ email, password });
  token = res.body.token;
});

describe("posts", () => {
  test("throws error if not authenticated at auth endpoints", (done) => {
    request(app).post("/posts").expect(401, done);
  });

  test("get posts works", async () => {
    const posts = await Post.find({}).exec();
    await request(app)
      .get("/posts")
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        for (let i = 0; i < res.body.length; i++) {
          expect(posts[i]._id.toString()).toBe(res.body[i]._id);
          expect(posts[i].text).toBe(res.body[i].text);
          expect(posts[i].created_at).toStrictEqual(
            new Date(res.body[i].created_at)
          );
          expect(posts[i].photos.length).toBe(res.body[i].photos.length);
          expect(posts[i].videos.length).toBe(res.body[i].videos.length);
        }
      });
  });

  test("get post by id works", async () => {
    const post = await Post.findOne({}).exec();
    if (!post) return;
    await request(app)
      .get(`/posts/${post._id}`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toStrictEqual(post._id.toString());
        expect(res.body.text).toBe(post.text);
        expect(res.body.photos.length).toBe(post.photos.length);
        expect(res.body.videos.length).toBe(post.videos.length);
        expect(res.body.user).toStrictEqual(post.user.toString());
      });
  });

  test("create post works", async () => {
    const user = await User.findOne({});
    if (!user) return;
    const postData = {
      text: "iran england, goals againts iran",
      videos: [{ url: "another video.ooeuoeucom" }],
      photos: [],
      created_at: new Date("2022-05-10"),
      user: user._id,
    };
    await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send(postData)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        expect(postData.text).toBe(res.body.text);
        expect(postData.photos.length).toBe(res.body.photos.length);
        expect(postData.videos.length).toBe(res.body.videos.length);
        expect(postData.created_at).toStrictEqual(
          new Date(res.body.created_at)
        );
      });
  });

  test("update post works", async () => {
    const post = await Post.findOne();
    const update = { text: "neweee text", created_at: new Date("1999-03-03") };
    if (!post) return;
    await request(app)
      .put(`/posts/${post._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(update)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        const foundPost = await Post.findOne({ _id: post._id });
        if (!foundPost) return;
        expect(foundPost._id).toStrictEqual(post._id);
        expect(foundPost.text).toBe(update.text);
        expect(foundPost.photos.length).toBe(res.body.photos.length);
        expect(foundPost.videos.length).toBe(res.body.videos.length);
        expect(foundPost.created_at).toStrictEqual(new Date(update.created_at));
      });
  });

  test("delete post works", async () => {
    const post = await Post.findOne();
    if (!post) return;
    await request(app)
      .delete(`/posts/${post._id}`)
      .set("Authorization", `Bearer ${token}`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        const foundPost = await Post.findOne({ _id: post._id });
        const postComments = await Comment.find({ post: post._id });
        expect(foundPost).toBeFalsy();
        expect(postComments.length).toBe(0);
      });
  });
});
