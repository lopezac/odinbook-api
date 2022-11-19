import { UserType } from "../types/user.types";
import { ReturnQuery } from "../types/request.types";
import User from "../models/user.model";
import Post from "../models/post.model";
import Friendship from "../models/friendship.model";

async function createUser(userData: UserType) {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (err) {
    throw Error("Error trying createUser in service");
  }
}

async function getUsers({ filter, page, sort }: ReturnQuery) {
  try {
    const users = await User.find(filter)
      .sort(sort)
      .limit(10)
      .skip(page)
      .exec();
    return users;
  } catch (err) {
    throw Error("Error getting users, user service");
  }
}

async function getUser(userId: string) {
  try {
    return await User.findById(userId).exec();
  } catch (err) {
    throw Error("Error getting user, user service");
  }
}

async function getUserPosts(userId: string) {
  try {
    return await Post.find({ _id: userId }).exec();
  } catch (err) {
    throw Error("Error getting user posts, user service");
  }
}

async function getUserFriends(userId: string) {
  try {
    const friendships = await Friendship.find({ users: { $in: [userId] } });
    return friendships.flat().filter((user) => user.toString() !== userId);
  } catch (err) {
    throw Error("Error getting user friends, user service");
  }
}

export default {
  createUser,
  getUsers,
  getUser,
  getUserPosts,
  getUserFriends,
};
