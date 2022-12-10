import { Request, Response } from "express";
import FriendReqService from "../services/friendRequest.service";
import FriendshipService from "../services/friendship.service";
import { getQueryParams } from "../utils/query.helper";
import { Query } from "../types/request.types";

type friendReq = { emitter: string; receiver: string };

async function post(req: Request, res: Response) {
  try {
    const { emitter, receiver }: friendReq = req.body;

    const friendReq = await FriendReqService.createFriendReq(emitter, receiver);

    return res.json(friendReq);
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

async function id_post(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const friendReq = await FriendReqService.getFriendReq(id);
    if (!friendReq) return;
    const { emitter, receiver } = friendReq;

    const friendship = await FriendshipService.createFriendship(
      emitter,
      receiver
    );
    await FriendReqService.deleteFriendReq(id);

    return res.json(friendship);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at id_post(), friendRequest controller", err });
  }
}

async function id_delete(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await FriendReqService.deleteFriendReq(id);

    return res.json({ friendRequestId: id });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at id_delete(), friendRequest controller", err });
  }
}

export default { post, get, id_post, id_delete };
