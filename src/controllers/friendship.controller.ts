import { Request, Response } from "express";
import { Query } from "../types/request.types";
import { getQueryParams } from "../utils/query.helper";
import FriendshipService from "../services/friendship.service";

async function post(req: Request, res: Response) {
  try {
    const query = getQueryParams(req.query as Query);

    const friendship = await FriendshipService.createFriendship(query);

    return res.json({ friendship });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at post(), friendship controller", err });
  }
}

async function get(req: Request, res: Response) {
  try {
    const query = getQueryParams(req.query as Query);

    const friendship = await FriendshipService.getFriendship(query);

    return res.json({ friendship });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at get(), friendship controller", err });
  }
}

async function friendships_delete(req: Request, res: Response) {
  try {
    const query = getQueryParams(req.query as Query);

    const friendship = await FriendshipService.deleteFriendship(query);

    return res.json({ friendship });
  } catch (err) {
    return res.status(500).json({
      message: "Error at friendships_delete(), friendship controller",
      err,
    });
  }
}

export default { post, get, friendships_delete };
