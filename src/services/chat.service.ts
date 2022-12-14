import Chat from "../models/chat.model";
import User from "../models/user.model";
import { ChatType } from "../types/chat.types";
import { ReturnQuery } from "../types/request.types";

async function createChat(chatData: ChatType) {
  try {
    return await Chat.create(chatData);
  } catch (err) {
    throw Error("Error creating chat, at chat service");
  }
}

async function getChats({ filter, page, sort }: ReturnQuery) {
  try {
    return await Chat.find(filter).exec();
  } catch (err) {
    throw Error(`Error getting chats, at chat service ${err}`);
  }
}

async function getChat(chatId: string) {
  try {
    return await Chat.findById(chatId).exec();
  } catch (err) {
    throw Error(`Error getting chat, by id, at chat service ${err}`);
  }
}

async function getUserChats(userId: string) {
  try {
    const chats = await Chat.find({ users: { $in: userId } });

    const filteredChats = await Promise.all(
      chats.map(async (chat) => {
        const receiverId = chat.users.filter((u) => u !== userId);
        const user = await User.findById(receiverId[0]);

        return { _id: chat._id, user };
      })
    );

    return filteredChats;
  } catch (err) {
    throw Error("Error getting user chats, at chat service");
  }
}

async function deleteChat(chatId: string) {
  try {
    return await Chat.findByIdAndDelete(chatId);
  } catch (err) {
    throw Error("Error deleting chat, at chat service");
  }
}

export default { createChat, getChat, getChats, getUserChats, deleteChat };
