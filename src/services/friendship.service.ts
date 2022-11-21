import { createObjectId } from "../utils/mongoose.helper";
import Friendship from "../models/friendship.model";

const createFriendship = async (user1: string, user2: string) => {
  try {
    const friendship = new Friendship({ users: [user1, user2] });
    return await friendship.save();
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
    const friends = friendships.reduce(
      (arr, value) => arr.concat(value.users),
      [] as any[]
    );

    return friends.filter((user) => user.toString() !== userId);
  } catch (err) {
    throw Error("Error getting user friends, friendship service");
  }
};

export default { createFriendship, deleteFriendship, getUserFriends };
