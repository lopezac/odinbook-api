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
import Comment from "../../../src/models/comment.model";
import Like from "../../../src/models/like.model";

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

  // create posts and comments
  for (let i = 0; i < data.posts.length; i++) {
    const user = await User.findOne({}).exec();
    if (!user) return;

    const post = await Post.create({ ...data.posts[i], user: user._id });

    for (let i = 0; i <= Math.round(Math.random() * 5); i++) {
      await Like.create({ receiver: post._id, user: user._id });
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

describe("posts", () => {
  test("throws error if not authenticated at auth endpoints", (done) => {
    request(app).post("/posts").expect(401, done);
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
        const foundPost = res.body.post;
        expect(res.statusCode).toBe(200);
        expect(foundPost._id).toStrictEqual(post._id.toString());
        expect(foundPost.text).toBe(post.text);
        expect(foundPost.photos.length).toBe(post.photos.length);
        expect(foundPost.videos.length).toBe(post.videos.length);
        expect(foundPost.user).toStrictEqual(post.user.toString());
      });
  });

  test("get post comments works", async () => {
    const post = await Post.findOne();
    if (!post) return;
    const comments = await Comment.find({ post: post._id });

    await request(app)
      .get(`/posts/${post._id}/comments`)
      .then(async (res) => {
        const foundComments = await Comment.find({ post: post._id });

        expect(res.statusCode).toBe(200);
        expect(foundComments.length).toBe(comments.length);
        for (let i = 0; i < comments.length; i++) {
          const comment = comments[i];
          const foundComment = foundComments[i];
          expect(comment.text).toBe(foundComment.text);
          expect(comment.created_at).toStrictEqual(foundComment.created_at);
          expect(comment.post).toStrictEqual(foundComment.post);
          expect(comment.user).toStrictEqual(foundComment.user);
        }
      });
  });

  test("get post likes works", async () => {
    const post = await Post.findOne();
    if (!post) return;
    const likes = await Like.count({ receiver: post._id });

    await request(app)
      .get(`/posts/${post._id}/likes`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.likes).toBeTruthy();
        expect(res.body.likes).toEqual(likes);
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
        const foundPost = await Post.findOne({ _id: post._id });
        if (!foundPost) return;

        expect(res.statusCode).toBe(200);
        expect(foundPost._id).toStrictEqual(post._id);
        expect(foundPost.text).toBe(update.text);
        expect(foundPost.photos.length).toBe(post.photos.length);
        expect(foundPost.videos.length).toBe(post.videos.length);
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
        const foundPost = await Post.findOne({ _id: post._id });
        const postComments = await Comment.find({ post: post._id });
        const postLikes = await Like.count({ receiver: post._id });

        expect(res.statusCode).toBe(200);
        expect(foundPost).toBeFalsy();
        expect(postComments.length).toBe(0);
        expect(postLikes).toBeFalsy();
      });
  });
});
