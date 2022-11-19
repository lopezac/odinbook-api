import { createObjectId } from "../utils/mongoose.helper";
import FriendRequest from "../models/friendRequest.model";

const createFriendReq = async (emitter: string, receiver: string) => {
  try {
    const emitterId = createObjectId(emitter);
    const receiverId = createObjectId(receiver);
    const friendReq = new FriendRequest({
      emitter: emitterId,
      receiver: receiverId,
    });
    return await friendReq.save();
  } catch (err) {
    throw Error("Error creating friend request at service");
  }
};

const deleteFriendReq = async (id: string) => {
  try {
    return await FriendRequest.findByIdAndDelete(id).exec();
  } catch (err) {
    throw Error("Error deleting friend request at service");
  }
};

const getFriendReq = async (id: string) => {
  try {
    return await FriendRequest.findById(id).exec();
  } catch (err) {
    throw Error("Error getting friend request at service");
  }
};

export default { createFriendReq, deleteFriendReq, getFriendReq };
