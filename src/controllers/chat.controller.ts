import { Request, Response } from "express";
import ChatService from "../services/chat.service";
import MessageService from "../services/message.service";
import { ChatType } from "../types/chat.types";

async function chats_post(req: Request, res: Response) {
  try {
    const chatData: ChatType = req.body;

    const chat = await ChatService.createChat(chatData);

    return res.json(chat);
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at chats_post, chat controller", err });
  }
}

async function chats_id_msgs_get(req: Request, res: Response) {
  try {
    const { chatId } = req.params;

    const messages = await MessageService.getChatMessages(chatId);

    return res.json(messages);
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at chats_id_msgs_get, chat controller", err });
  }
}

async function chats_id_delete(req: Request, res: Response) {
  try {
    const { chatId } = req.params;

    await ChatService.deleteChat(chatId);

    return res.json({ chatId });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at chats_delete, chat controller", err });
  }
}

export default { chats_post, chats_id_msgs_get, chats_id_delete };
