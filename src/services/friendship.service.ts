import { flattenFilterUsers } from "../utils/array.helper";
import { createObjectId } from "../utils/mongoose.helper";
import Friendship from "../models/friendship.model";
import { ReturnQuery } from "../types/request.types";

const createFriendship = async ({ filter, page, sort }: ReturnQuery) => {
  try {
    return await Friendship.create({
      users: [filter.emitter, filter.receiver],
    });
  } catch (err) {
    throw Error("Error creating friendship, at service");
  }
};

const getFriendship = async ({ filter, page, sort }: any) => {
  try {
    return await Friendship.findOne({
      users: { $all: [filter.userOne, filter.userTwo] },
    }).exec();
  } catch (err) {
    throw Error("Error getting friendship, friendship service");
  }
};

const getUserFriends = async (userId: string) => {
  try {
    const friendships = await Friendship.find({ users: { $in: userId } });

    const friendIds = flattenFilterUsers(friendships, userId);

    return friendIds;
  } catch (err) {
    throw Error("Error getting user friends, friendship service");
  }
};

const deleteFriendship = async ({ filter, page, sort }: ReturnQuery) => {
  try {
    return await Friendship.findOneAndDelete({
      users: { $all: [filter.userOne, filter.userTwo] },
    }).exec();
  } catch (err) {
    throw Error("Error deleting friendship, at service");
  }
};

export default {
  createFriendship,
  getUserFriends,
  getFriendship,
  deleteFriendship,
};
