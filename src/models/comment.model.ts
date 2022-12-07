import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, minLength: 1, maxLength: 1000, required: true },
  created_at: { type: Date, default: new Date(), required: false },
  user: { type: String, minLength: 24, maxLength: 24, required: true },
  post: { type: String, minLength: 24, maxLength: 24, required: true },
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
