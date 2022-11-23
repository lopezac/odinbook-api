import { MessageType } from "../types/message.types";
import Message from "../models/message.model";

async function createMessage(msgData: MessageType) {
  try {
    return await Message.create(msgData);
  } catch (err) {
    return new Error("Error creating message, at message service");
  }
}

async function getChatMessages(chatId: string) {
  try {
    return await Message.find({ chat: chatId });
  } catch (err) {
    return new Error("Error getting chat messages, at message service");
  }
}

async function deleteMessage(msgId: string) {
  try {
    return await Message.findByIdAndDelete(msgId);
  } catch (err) {
    return new Error("Error deleting message, at message service");
  }
}

export default { createMessage, getChatMessages, deleteMessage };
