import { Request, Response } from "express";
import { LikeType } from "../types/like.types";
import { Query } from "../types/request.types";
import LikeService from "../services/like.service";
import { getQueryParams } from "../utils/query.helper";

async function likes_post(req: Request, res: Response) {
  try {
    const likeData = req.body as LikeType;

    const like = await LikeService.createLike(likeData);

    return res.json({ like });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at likes_post, like controller", err });
  }
}

async function likes_get(req: Request, res: Response) {
  try {
    const query = getQueryParams(req.query as Query);

    const likes = await LikeService.getLikes(query);

    return res.json({ likes });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at likes_get, like controller", err });
  }
}

async function likes_delete(req: Request, res: Response) {
  try {
    const query = getQueryParams(req.query as Query);

    await LikeService.deleteLike(query);

    return res.json({ success: "Got success on query" });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at likes_delete, like controller", err });
  }
}

export default { likes_post, likes_get, likes_delete };
