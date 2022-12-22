import { Server, Socket } from "socket.io";
import { registerMessageHandlers } from "./message.handler";
import { registerNotificationHandlers } from "./notification.handler";
import { registerPostHandlers } from "./post.handler";
import { registerCommentHandlers } from "./comment.handler";
import { registerLikeHandlers } from "./like.handler";

export const registerHandlers = (io: Server, socket: Socket) => {
  registerMessageHandlers(io, socket);
  registerNotificationHandlers(io, socket);
  registerPostHandlers(io, socket);
  registerCommentHandlers(io, socket);
  registerLikeHandlers(io, socket);
};
