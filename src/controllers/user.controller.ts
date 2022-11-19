import { Request, Response } from "express";
import { Query } from "types/request.types";
import UserService from "../services/user.service";
import { getQueryParams } from "../utils/query.helper";

async function users_get(req: Request, res: Response) {
  try {
    const query = getQueryParams(req.query as Query);
    const users = await UserService.getUsers(query);
    return res.json(users);
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at users_get, user controller", err });
  }
}

async function users_id_get(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const user = await UserService.getUser(userId);
    return res.json(user);
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at users_id_get, user controller", err });
  }
}

async function users_id_posts_get(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const posts = await UserService.getUserPosts(userId);
    return res.json(posts);
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at users_id_posts_get, user controller", err });
  }
}

async function users_id_friends_get(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const friends = await UserService.getUserFriends(userId);
    return res.json(friends);
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at users_id_friends_get, user controller", err });
  }
}

export default {
  users_get,
  users_id_get,
  users_id_posts_get,
  users_id_friends_get,
};
