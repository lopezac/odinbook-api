import { Request, Response } from "express";
import CommentService from "../services/comment.service";
import LikeService from "../services/like.service";
import { CommentData, CommentUpdate } from "../types/comment.types";

async function comments_post(req: Request, res: Response) {
  try {
    const commentData = req.body as CommentData;

    const comment = await CommentService.createComment(commentData);

    return res.json(comment);
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at comments_post, Comment controller", err });
  }
}

async function comments_id_get(req: Request, res: Response) {
  try {
    const { commentId } = req.params;

    const comment = await CommentService.getComment(commentId);

    return res.json(comment);
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at comments_id_get, Comment controller", err });
  }
}

async function comments_id_put(req: Request, res: Response) {
  try {
    const commentUpdate = req.body as CommentUpdate;
    const { commentId } = req.params;

    const comment = await CommentService.updateComment(
      commentId,
      commentUpdate
    );

    return res.json(comment);
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at comments_id_put, Comment controller", err });
  }
}

async function comments_id_delete(req: Request, res: Response) {
  try {
    const { commentId } = req.params;

    await CommentService.deleteComment(commentId);
    await LikeService.deleteByReceiver(commentId);

    return res.json(commentId);
  } catch (err) {
    return res.status(503).json({
      message: "Error at comments_id_delete, Comment controller",
      err,
    });
  }
}

export default {
  comments_post,
  comments_id_get,
  comments_id_put,
  comments_id_delete,
};
