import { CommentData, CommentUpdate } from "../types/comment.types";
import Comment from "../models/comment.model";

async function createComment(commentData: CommentData) {
  try {
    return await Comment.create(commentData);
  } catch (err) {
    throw Error("Error creating comment, at comment service");
  }
}

async function getPostComments(postId: string) {
  try {
    return await Comment.find({ post: postId });
  } catch (err) {
    throw Error("Error getting post comments, at comment service");
  }
}

async function getComment(commentId: string) {
  try {
    return await Comment.findById(commentId);
  } catch (err) {
    throw Error("Error getting comment by id, at comment service");
  }
}

async function updateComment(commentId: string, update: CommentUpdate) {
  try {
    return await Comment.findByIdAndUpdate(commentId, update);
  } catch (err) {
    throw Error("Error updating comment, at comment service");
  }
}

async function deleteComment(commentId: string) {
  try {
    return await Comment.findByIdAndDelete(commentId);
  } catch (err) {
    throw Error("Error deleting comment, at comment service");
  }
}

async function deletePostComments(postId: string) {
  try {
    return await Comment.deleteMany({ post: postId });
  } catch (err) {
    throw Error("Error deleting post comments, at comment service");
  }
}

export default {
  createComment,
  getComment,
  getPostComments,
  updateComment,
  deleteComment,
  deletePostComments,
};
