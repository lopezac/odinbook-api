export type MessageType = {
  receiver: string;
  emitter: string;
  chat: string;
  _id?: string;
  text: string;
  created_at: Date;
};

export type MessagesArray = MessageType[];
