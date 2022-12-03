import Post from "../models/post.model";
import { PostType, PostUpdate } from "../types/post.types";
import { ReturnQuery } from "../types/request.types";

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

async function getUserPostsWithMedia(userId: string, mediaType: string, { filter, page, sort }: ReturnQuery) {
  try {
    return await Post.find({
      user: userId,
      [mediaType]: { $exists: true, $not: { $size: 0 } },
    })
    .sort(sort)
    .limit(10)
    .skip(page)
    .exec();
  } catch (err) {
    throw Error(
      `Error getting user posts with media ${mediaType}, post service`
    );
  }
}

async function updatePost(userId: string, postUpdate: PostUpdate) {
  try {
    return await Post.findByIdAndUpdate(userId, postUpdate);
  } catch (err) {
    throw Error("Error deleting post, post service");
  }
}

async function deletePost(postId: string) {
  try {
    return await Post.findOneAndDelete({ post: postId });
  } catch (err) {
    throw Error("Error deleting post, post service");
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
  updatePost,
  deletePost,
  deleteUserPosts,
};
