import { Server, Socket } from "socket.io";
import { LikeType } from "../types/like.types";

export const registerLikeHandlers = (io: Server, socket: Socket) => {
  const createOrder = (data: LikeType) => {
    return socket.emit("like:create", data);
  };

  const deleteOrder = (id: string) => {
    return socket.emit("like:delete", id);
  };

  socket.on("like:create", createOrder);
  socket.on("like:delete", deleteOrder);
};
