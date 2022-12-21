import { Server, Socket } from "socket.io";
import { MessageType } from "../types/message.types";

export const registerMessageHandlers = (io: Server, socket: Socket) => {
  const createMessage = (message: MessageType) => {
    return socket.emit("message:create", message);
  };

  const deleteMessage = () => {
    return;
  };

  socket.on("message:create", createMessage);
  socket.on("message:delete", deleteMessage);
};
