export const registerMessageHandlers = (io, socket) => {
  const createOrder = (payload) => {
    return;
  };

  const deleteOrder = () => {
    return;
  };

  socket.on("message:create", createOrder);
  socket.on("message:delete", deleteOrder);
};
