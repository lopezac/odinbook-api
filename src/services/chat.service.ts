import Chat from "../models/chat.model";
import { ChatType } from "../types/chat.types";

async function createChat(chatData: ChatType) {
  try {
    return await Chat.create(chatData);
  } catch (err) {
    return new Error("Error creating chat, at chat service");
  }
}

async function deleteChat(chatId: string) {
  try {
    return await Chat.findByIdAndDelete(chatId);
  } catch (err) {
    return new Error("Error deleting chat, at chat service");
  }
}

export default { createChat, deleteChat };
