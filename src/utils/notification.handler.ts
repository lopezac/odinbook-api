export const registerNotificationHandlers = (io, socket) => {
  const createOrder = (payload) => {
    return;
  };

  const deleteOrder = () => {
    return;
  };

  socket.on("notification:create", createOrder);
  socket.on("notification:delete", deleteOrder);
};
