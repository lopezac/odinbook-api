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

const deleteFriendship = async (id: string) => {
  try {
    return await Friendship.findByIdAndDelete(id);
  } catch (err) {
    throw Error("Error deleting friendship, at service");
  }
};

const getUserFriends = async (userId: string) => {
  try {
    const id = createObjectId(userId);

    const friendships = await Friendship.find({ users: { $in: id } });
    console.log("friendships", friendships);
    const friends = friendships.reduce(
      (arr, value) => arr.concat(value.users),
      [] as any[]
    );
    const filterFriends = friends.filter((user) => user.toString() !== userId);
    console.log("friends", friends);

    return filteredFriends;
  } catch (err) {
    throw Error("Error getting user friends, friendship service");
  }
};

export default { createFriendship, deleteFriendship, getUserFriends };
