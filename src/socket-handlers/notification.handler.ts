import { Server, Socket } from "socket.io";
import { NotificationType } from "../types/notification.types";

export const registerNotificationHandlers = (io: Server, socket: Socket) => {
  const createNotification = (data: NotificationType) => {
    return socket.emit("notification:create", data);
  };

  const deleteNotification = (id: string) => {
    return socket.emit("notification:delete", id);
  };

  socket.on("notification:create", createNotification);
  socket.on("notification:delete", deleteNotification);
};
