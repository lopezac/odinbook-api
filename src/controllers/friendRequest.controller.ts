import { Request, Response } from "express";
import FriendReqService from "../services/friendRequest.service";

type friendReq = { emitter: string; receiver: string };

async function post(req: Request, res: Response) {
  try {
    const { emitter, receiver }: friendReq = req.body;

    const friendReq = await FriendReqService.create(emitter, receiver);

    return res.json(friendReq);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at post(), friendRequest controller", err });
  }
}

async function id_delete(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await FriendReqService.id_delete(id);

    return res.json({ friendRequestId: id });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at id_delete(), friendRequest controller", err });
  }
}

async function id_post(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await FriendReqService.id_delete(id);

    return res.json(req.body);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error at id_post(), friendRequest controller", err });
  }
}

export default { post, id_delete, id_post };
