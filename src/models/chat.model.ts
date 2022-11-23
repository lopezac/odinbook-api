import mongoose from "mongoose";

const Schema = mongoose.Schema;

function validateLength(val: string[]) {
  return val.length === 2;
}

const ChatSchema = new Schema({
  users: { type: [String], required: true },
});

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
