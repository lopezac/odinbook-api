import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  receiver: { type: String, minLength: 24, maxLength: 24, required: true },
  emitter: { type: String, minLength: 24, maxLength: 24, required: true },
  chat: { type: String, minLength: 24, maxLength: 24, required: true },
  text: { type: String, minLength: 1, required: true },
  created_at: { type: Date, required: false, default: new Date() },
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
