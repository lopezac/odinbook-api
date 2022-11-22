import { Request, Response } from "express";
import { LikeType } from "../types/like.types";
import LikeService from "../services/like.service";

async function comments_post(req: Request, res: Response) {
  try {
    const likeData = req.body as LikeType;

    const like = await LikeService.createLike(likeData);

    return res.json({});
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at comments_post, like controller", err });
  }
}

export default { comments_post };
