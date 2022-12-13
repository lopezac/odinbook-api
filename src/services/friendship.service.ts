import { flattenFilterUsers } from "../utils/array.helper";
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

const getUserFriends = async (userId: string) => {
  try {
    const friendships = await Friendship.find({ users: { $in: userId } });

    const friendIds = flattenFilterUsers(friendships, userId);

    return friendIds;
  } catch (err) {
    throw Error("Error getting user friends, friendship service");
  }
};

const deleteFriendship = async (id: string) => {
  try {
    return await Friendship.findByIdAndDelete(id);
  } catch (err) {
    throw Error("Error deleting friendship, at service");
  }
};

export default { createFriendship, deleteFriendship, getUserFriends };
