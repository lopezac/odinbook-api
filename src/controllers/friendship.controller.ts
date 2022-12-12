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

async function id_delete(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await FriendshipService.deleteFriendship(id);

    return res.json({ friendshipId: id });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at id_delete(), friendship controller", err });
  }
}

export default { post, id_delete };
