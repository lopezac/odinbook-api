import { UserType, UserUpdate } from "../types/user.types";
import { ReturnQuery } from "../types/request.types";
import User from "../models/user.model";
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

async function updateUser(userId: string, update: UserUpdate) {
  try {
    return await User.findByIdAndUpdate(userId, update).exec();
  } catch (err) {
    throw Error("Error updating user, user service");
  }
}

async function deleteUser(userId: string) {
  try {
    return await User.findByIdAndDelete(userId).exec();
  } catch (err) {
    throw Error("Error deleting user, user service");
  }
}

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
