import { Request, Response } from "express";
import { getQueryParams } from "../utils/query.helper";
import ChatService from "../services/chat.service";
import UserService from "../services/user.service";
import MessageService from "../services/message.service";
import { ChatType } from "../types/chat.types";
import { Query } from "../types/request.types";

async function chats_post(req: Request, res: Response) {
  try {
    const chatData: ChatType = req.body;

    const chat = await ChatService.createChat(chatData);

    return res.json({ chat });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at chats_post, chat controller", err });
  }
}

async function chats_get(req: Request, res: Response) {
  try {
    const query = getQueryParams(req.query as Query);

    const chat = await ChatService.getChats(query);

    return res.json({ chat });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at chats_get, chat controller", err });
  }
}

async function chats_id_msgs_get(req: Request, res: Response) {
  try {
    const { chatId } = req.params;

    const messages = await MessageService.getChatMessages(chatId);

    return res.json({ messages });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at chats_id_msgs_get, chat controller", err });
  }
}

async function chats_id_users_get(req: Request, res: Response) {
  try {
    const { chatId } = req.params;

    const chat = await ChatService.getChat(chatId);
    const userIds = chat!.users;
    const users = await UserService.getUsersByIdArray(userIds);

    return res.json({ users });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at chats_id_users_get, chat controller", err });
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

export default {
  chats_post,
  chats_get,
  chats_id_msgs_get,
  chats_id_users_get,
  chats_id_delete
};
