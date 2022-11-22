import { LikeType } from "../types/like.types";
import Like from "../models/like.model";

async function getReceiverLikes(receiverId: string) {
  try {
    return await Like.count({ receiver: receiverId });
  } catch (err) {
    return new Error("Error getting receiver likes, like service");
  }
}

async function createLike(likeData: LikeType) {
  try {
    return await Like.create(likeData);
  } catch (err) {
    return new Error("Error creating like, like service");
  }
}

async function deleteByReceiver(receiverId: string) {
  try {
    return await Like.deleteMany({ receiver: receiverId });
  } catch (err) {
    return new Error("Error deleting comments by receiver, like service");
  }
}

export default { createLike, getReceiverLikes, deleteByReceiver };
