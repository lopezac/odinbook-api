import { UserType } from "../types/user.types";
import User from "../models/user.model";

async function createUser(userData: UserType) {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (err) {
    throw Error("Error trying createUser in service");
  }
}

export { createUser };
