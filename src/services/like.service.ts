import { LikeType } from "../types/like.types";
import { ReturnQuery } from "../types/request.types";
import Like from "../models/like.model";

async function createLike(likeData: LikeType) {
  try {
    return await Like.create(likeData);
  } catch (err) {
    return new Error("Error creating like, like service");
  }
}

async function getLikes({ filter, page, sort }: ReturnQuery) {
  try {
    console.log("filter at getLikes service");
    return await Like.find(filter).exec();
  } catch (err) {
    return new Error("Error getting likes, like service");
  }
}

async function getReceiverLikes(receiverId: string) {
  try {
    return await Like.count({ receiver: receiverId }).exec();
  } catch (err) {
    return new Error("Error getting receiver likes, like service");
  }
}

async function deleteByReceiver(receiverId: string) {
  try {
    return await Like.deleteMany({ receiver: receiverId }).exec();
  } catch (err) {
    return new Error("Error deleting likes by receiver, like service");
  }
}

async function deleteLike({ filter, sort, page }: ReturnQuery) {
  try {
    return await Like.findOneAndDelete(filter).exec();
  } catch (err) {
    return new Error("Error deleting like with filter query, like service");
  }
}

export default {
  createLike,
  getLikes,
  getReceiverLikes,
  deleteLike,
  deleteByReceiver,
};
