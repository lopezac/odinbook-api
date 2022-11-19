import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, required: true },
  receiver: { type: mongoose.Types.ObjectId, required: true },
});

const Like = mongoose.model("Like", LikeSchema);

export default Like;
