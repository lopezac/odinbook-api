import { Request, Response } from "express";

async function chats_post(req: Request, res: Response) {
  try {
    return res.json({});
  } catch (err) {
    return res.status(503).json({ message: "Error at chats_post, chat controller", err });
  }
}

async function chats_id_msgs_get(req: Request, res: Response) {
  try {
    return res.json({});
  } catch (err) {
    return res.status(503).json({ message: "Error at chats_id_msgs_get, chat controller", err });
  }
}

async function chats_delete(req: Request, res: Response) {
  try {
    return res.json({});
  } catch (err) {
    return res.status(503).json({ message: "Error at chats_delete, chat controller", err });
  }
}

export default { chats_post, chats_id_msgs_get, chats_id_delete };
