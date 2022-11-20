import { Request, Response } from "express";
import FriendshipService from "../services/friendship.service";

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

export default { id_delete };
