import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
  emitter: { type: String, required: true, minLength: 24, maxLength: 24 },
  receiver: { type: String, required: true, minLength: 24, maxLength: 24 },
});

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);

export default FriendRequest;
