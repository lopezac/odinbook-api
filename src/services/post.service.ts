import Post from "../models/post.model";
import { PostType } from "../types/post.types";

async function createPost(postData: PostType) {
  try {
    const post = new Post(postData);
    return await post.save();
  } catch (err) {
    throw Error("Error creating post, user service");
  }
}

async function getPosts() {
  try {
    return await Post.find({}).exec();
  } catch (err) {
    throw Error("Error getting user posts, user service");
  }
}

async function getPost(postId: string) {
  try {
    return await Post.findById(postId).exec();
  } catch (err) {
    throw Error("Error getting user post by id, user service");
  }
}

async function getUserPosts(userId: string) {
  try {
    return await Post.find({ user: userId }).exec();
  } catch (err) {
    throw Error("Error getting user posts, user service");
  }
}

async function getUserPostsWithMedia(userId: string, mediaType: string) {
  try {
    return await Post.find({
      user: userId,
      [mediaType]: { $exists: true, $not: { $size: 0 } },
    }).exec();
  } catch (err) {
    throw Error("Error getting user posts, post service");
  }
}

async function deleteUserPosts(userId: string) {
  try {
    return await Post.deleteMany({ user: userId });
  } catch (err) {
    throw Error("Error deleting user posts, post service");
  }
}

export default {
  createPost,
  getPosts,
  getPost,
  getUserPosts,
  getUserPostsWithMedia,
  deleteUserPosts,
};
