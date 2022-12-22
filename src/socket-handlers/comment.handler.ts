import { Server, Socket } from "socket.io";
import { CommentData } from "../types/comment.types";

export const registerCommentHandlers = (io: Server, socket: Socket) => {
  const createOrder = (data: CommentData) => {
    return socket.emit("comment:create", data);
  };

  const deleteOrder = (id: string) => {
    return socket.emit("comment:delete", id);
  };

  socket.on("comment:create", createOrder);
  socket.on("comment:delete", deleteOrder);
};
