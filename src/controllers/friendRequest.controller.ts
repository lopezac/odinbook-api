import { Request, Response } from "express";
import FriendReqService from "../services/friendRequest.service";
import FriendshipService from "../services/friendship.service";
import { getQueryParams } from "../utils/query.helper";
import { Query } from "../types/request.types";

type friendReq = { emitter: string; receiver: string };

async function post(req: Request, res: Response) {
  try {
    const { emitter, receiver }: friendReq = req.body;

    const friendRequest = await FriendReqService.createFriendReq(
      emitter,
      receiver
    );

    return res.json({ friendRequest });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at post(), friendRequest controller", err });
  }
}

async function get(req: Request, res: Response) {
  try {
    const query = getQueryParams(req.query as Query);

    const friendRequests = await FriendReqService.getFriendRequests(query);

    return res.json({ friendRequests });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at post(), friendRequest controller", err });
  }
}

// remove not useful function
async function id_post(req: Request, res: Response) {
  try {
    const { id } = req.params;

    return res.json({ id });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at id_post(), friendRequest controller", err });
  }
}

async function id_delete(req: Request, res: Response) {
  try {
    const query = getQueryParams(req.query as Query);

    await FriendReqService.deleteFriendReq(query);

    return res.json({ success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at id_delete(), friendRequest controller", err });
  }
}

export default { post, get, id_post, id_delete };
