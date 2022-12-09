import { Request, Response } from "express";
import PostService from "../services/post.service";
import CommentService from "../services/comment.service";
import LikeService from "../services/like.service";
import { PostType, PostUpdate } from "../types/post.types";

async function posts_get(req: Request, res: Response) {
  try {
    const posts = await PostService.getPosts();

    return res.json({ posts });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at posts_get, post controller", err });
  }
}

async function posts_id_get(req: Request, res: Response) {
  try {
    const { postId } = req.params;

    const post = await PostService.getPost(postId);

    return res.json({ post });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at posts_id_get, post controller", err });
  }
}

async function posts_id_comments_get(req: Request, res: Response) {
  try {
    const { postId } = req.params;

    const comments = await CommentService.getPostComments(postId);

    return res.json({ comments });
  } catch (err) {
    return res.status(500).json({
      message: "Error at posts_id_comments_get, post controller",
      err,
    });
  }
}

async function posts_id_likes_get(req: Request, res: Response) {
  try {
    const { postId } = req.params;

    const likes = await LikeService.getReceiverLikes(postId);

    return res.json({ likes });
  } catch (err) {
    return res.status(500).json({
      message: "Error at posts_id_likes_get, post controller",
      err,
    });
  }
}

async function posts_post(req: Request, res: Response) {
  try {
    const { text, photos, videos, created_at, user } = req.body as PostType;

    const post = await PostService.createPost({
      text,
      photos,
      videos,
      created_at,
      user,
    });

    return res.json(post);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at posts_post, post controller", err });
  }
}

async function posts_id_put(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const postUpdate = req.body as PostUpdate;

    const post = await PostService.updatePost(postId, postUpdate);

    return res.json({ post });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at posts_id_put, post controller", err });
  }
}

async function posts_id_delete(req: Request, res: Response) {
  try {
    const { postId } = req.params;

    await CommentService.deletePostComments(postId);
    await LikeService.deleteByReceiver(postId);
    await PostService.deletePost(postId);

    return res.json({ success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at posts_id_delete, post controller", err });
  }
}

export default {
  posts_get,
  posts_id_get,
  posts_id_comments_get,
  posts_id_likes_get,
  posts_post,
  posts_id_put,
  posts_id_delete,
};
