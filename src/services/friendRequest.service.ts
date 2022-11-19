import { createObjectId } from "../utils/mongoose.helper";
import FriendRequest from "../models/friendRequest.model";

const create = async (emitter: string, receiver: string) => {
  try {
    const emitterId = createObjectId(emitter);
    const receiverId = createObjectId(receiver);
    const friendReq = new FriendRequest({
      emitter: emitterId,
      receiver: receiverId,
    });
    console.log("friendReq", friendReq);
    return await friendReq.save();
  } catch (err) {
    throw Error("Error creating friend request at service");
  }
};

const id_delete = async (id: string) => {
  try {
    return await FriendRequest.findByIdAndDelete(id);
  } catch (err) {
    throw Error("Error deleting friend request at service");
  }
};

export default { create, id_delete };
