import dotenv from "dotenv";
import express from "express";
import request from "supertest";
dotenv.config();

import MongoServer from "../configs/db.config";
import data from "../data";
import userRouter from "../../../src/routes/user.route";
import authRouter from "../../../src/routes/auth.route";
import User from "../../../src/models/user.model";
import Post from "../../../src/models/post.model";
import Friendship from "../../../src/models/friendship.model";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
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

  // create posts
  for (const postData of data.posts) {
    const user = await User.findOne({}).exec();
    if (!user) return;
    const post = new Post({ ...postData, user: user._id });
    await post.save();
  }

  const { email, password } = data.users[0];
  const res = await request(app).post("/sign-in").send({ email, password });
  token = res.body.token;
});

describe("users", () => {
  test("throws error if not authenticated at auth endpoints", (done) => {
    request(app).delete("/users/5T").expect(401, done);
  });

  test("get user works", async () => {
    const users = await User.find({}).exec();
    await request(app)
      .get(`/users/${users[0]._id}`)
      .then(async (res) => {
        const foundUser = res.body.user;
        expect(res.statusCode).toBe(200);
        expect(users[0].firstName).toBe(foundUser.firstName);
        expect(users[0].lastName).toBe(foundUser.lastName);
        expect(users[0].birthday).toStrictEqual(new Date(foundUser.birthday));
        expect(users[0].password).toBe(foundUser.password);
        expect(users[0].email).toBe(foundUser.email);
        expect(users[0].gender).toBe(foundUser.gender);
        expect(foundUser._id).toBeTruthy();
      });
  });

  test("get users works", async () => {
    const users = await User.find({}).sort("-_id").exec();
    await request(app)
      .get(`/users`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        for (let i = 0; i < users.length; i++) {
          expect(users[i].firstName).toBe(res.body[i].firstName);
          expect(users[i].lastName).toBe(res.body[i].lastName);
          expect(users[i].birthday).toStrictEqual(
            new Date(res.body[i].birthday)
          );
          expect(users[i].password).toBe(res.body[i].password);
          expect(users[i].email).toBe(res.body[i].email);
          expect(users[i].gender).toBe(res.body[i].gender);
          expect(res.body[i]._id).toBeTruthy();
        }
      });
  });

  test("get user posts works", async () => {
    const user = await User.findOne({}).exec();
    if (!user) return null;
    const posts = await Post.find({ user: user._id }).exec();

    await request(app)
      .get(`/users/${user._id}/posts`)
      .then(async (res) => {
        const foundPosts = res.body.posts;

        expect(res.statusCode).toBe(200);
        expect(posts.length).not.toBe(0);
        expect(foundPosts.length).not.toBe(0);
        for (let i = 0; i < foundPosts.length; i++) {
          expect(posts[i].text).toBe(foundPosts[i].text);
          expect(posts[i].created_at).toStrictEqual(
            new Date(foundPosts[i].created_at)
          );
          expect(posts[i].photos.length).toBe(foundPosts[i].photos.length);
          expect(posts[i].videos.length).toBe(foundPosts[i].videos.length);
          expect(posts[i]._id.toString()).toEqual(foundPosts[i]._id);
          expect(posts[i].user.toString()).toEqual(foundPosts[i].user);
        }
      });
  });

  test("get user posts with photos works", async () => {
    const user = await User.findOne({}).exec();
    if (!user) return null;
    const posts = await Post.find({
      user: user._id,
      photos: { $exists: true, $not: { $size: 0 } },
    })
      .sort("-_id")
      .exec();

    await request(app)
      .get(`/users/${user._id}/photos`)
      .then(async (res) => {
        const foundPosts = res.body.posts;

        expect(res.statusCode).toBe(200);
        expect(foundPosts.length).not.toBe(0);
        for (let i = 0; i < foundPosts.length; i++) {
          expect(posts[i].text).toBe(foundPosts[i].text);
          expect(posts[i].created_at).toStrictEqual(
            new Date(foundPosts[i].created_at)
          );
          expect(posts[i].photos.length).toBe(foundPosts[i].photos.length);
          expect(posts[i].videos.length).toBe(foundPosts[i].videos.length);
          expect(posts[i]._id.toString()).toEqual(foundPosts[i]._id);
          expect(posts[i].user.toString()).toEqual(foundPosts[i].user);
        }
      });
  });

  test("get user posts with videos works", async () => {
    const user = await User.findOne({}).exec();
    if (!user) return null;
    const posts = await Post.find({
      user: user._id,
      videos: { $exists: true, $not: { $size: 0 } },
    }).exec();

    await request(app)
      .get(`/users/${user._id}/videos`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).not.toBe(0);
        for (let i = 0; i < res.body.length; i++) {
          expect(posts[i].text).toBe(res.body[i].text);
          expect(posts[i].created_at).toStrictEqual(
            new Date(res.body[i].created_at)
          );
          expect(posts[i].photos.length).toBe(res.body[i].photos.length);
          expect(posts[i].videos.length).toBe(res.body[i].videos.length);
          expect(posts[i]._id.toString()).toEqual(res.body[i]._id);
          expect(posts[i].user.toString()).toEqual(res.body[i].user);
        }
      });
  });

  test("get user friends works", async () => {
    const user = await User.findOne({}).exec();
    if (!user) return null;

    await request(app)
      .get(`/users/${user._id}/friends`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).not.toBe(0);
        expect(res.body.includes(user._id)).toBeFalsy();
        expect(res.body[0].length).toBe(24);
        expect(res.body[1].length).toBe(24);
      });
  });

  test("delete user works", async () => {
    const user = await User.findOne({}).exec();
    if (!user) return;
    await request(app)
      .del(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        const foundUser = await User.findById(user._id).exec();
        const foundPosts = await Post.find({ user: user._id }).exec();
        expect(foundUser).toBeFalsy();
        expect(foundPosts).toEqual([]);
      });
  });

  test("update user works", async () => {
    const user = await User.findOne({}).exec();
    if (!user) return;
    await request(app)
      .put(`/users/${user._id}`)
      .send({ lastName: "rodriguez", birthday: "1920-05-11", gender: "female" })
      .set("Authorization", `Bearer ${token}`)
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        const foundUser = await User.findById(user._id).exec();
        if (!foundUser) return;
        expect(foundUser.lastName).toBe("rodriguez");
        expect(foundUser.birthday).toStrictEqual(new Date("1920-05-11"));
        expect(foundUser.gender).toBe("female");
        expect(foundUser.firstName).toBe(user.firstName);
        expect(foundUser._id).toStrictEqual(user._id);
        expect(foundUser.email).toBe(user.email);
      });
  });
});
