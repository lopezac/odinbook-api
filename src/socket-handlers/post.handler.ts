import { Server, Socket } from "socket.io";
import { PostType } from "../types/post.types";

export const registerPostHandlers = (io: Server, socket: Socket) => {
  const createOrder = (data: PostType) => {
    return socket.emit("post:create", data);
  };

  const deleteOrder = (id: string) => {
    return socket.emit("post:delete", id);
  };

  socket.on("post:create", createOrder);
  socket.on("post:delete", deleteOrder);
};
