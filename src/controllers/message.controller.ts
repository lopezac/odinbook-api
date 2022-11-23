import { Request, Response } from "express";
import { MessageType } from "../types/message.types";
import MessageService from "../services/message.service";

async function messages_post(req: Request, res: Response) {
  try {
    const msgData: MessageType = req.body;

    const message = await MessageService.createMessage(msgData);

    return res.json(message);
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at messages_post, chat controller", err });
  }
}

async function messages_id_delete(req: Request, res: Response) {
  try {
    const { messageId } = req.params;

    await MessageService.deleteMessage(messageId);

    return res.json({ messageId });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at messages_id_delete, chat controller", err });
  }
}

export default { messages_post, messages_id_delete };
