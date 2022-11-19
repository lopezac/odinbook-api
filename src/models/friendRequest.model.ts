import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
  emitter: { type: mongoose.Types.ObjectId, required: true },
  receiver: { type: mongoose.Types.ObjectId, required: true },
});

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);

export default FriendRequest;
