import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FriendshipSchema = new Schema({
  users: { type: Array, required: true },
});

const Friendship = mongoose.model("Friendship", FriendshipSchema);

export default Friendship;
