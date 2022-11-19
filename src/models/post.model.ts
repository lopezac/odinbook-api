import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, required: true },
  text: { type: String, minLength: 1, maxLength: 10000, required: true },
  photos: { type: Array, required: false },
  videos: { type: Array, required: false },
  created_at: { type: Date, default: new Date(), required: true },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
