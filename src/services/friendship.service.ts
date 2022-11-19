import Friendship from "../models/friendship.model";

const createFriendship = async (user1: string, user2: string) => {
  try {
    const friendship = new Friendship({ users: [user1, user2] });
    return await friendship.save();
  } catch (err) {
    throw Error("Error creating friendship, at service");
  }
};

export default { createFriendship };
