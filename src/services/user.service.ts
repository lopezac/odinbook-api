import { UserType } from "../types/user.types";
import User from "../models/user.model";
import { ReturnQuery } from "../types/request.types";

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

export { createUser, getUsers };
