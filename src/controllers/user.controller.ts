import { Request, Response } from "express";
import { Query } from "../types/request.types";
import { UserUpdate } from "../types/user.types";
import { hashPassword } from "../services/auth.service";
import UserService from "../services/user.service";
import PostService from "../services/post.service";
import FriendshipService from "../services/friendship.service";
import { getLastPathWord, getQueryParams } from "../utils/query.helper";

async function get(req: Request, res: Response) {
  try {
    const query = getQueryParams(req.query as Query);

    const users = await UserService.getUsers(query);

    return res.json(users);
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at get, user controller", err });
  }
}

async function id_get(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const user = await UserService.getUser(userId);

    return res.json({ user });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at id_get, user controller", err });
  }
}

async function id_posts_get(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const posts = await PostService.getUserPosts(userId);

    return res.json({ posts });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at id_posts_get, user controller", err });
  }
}

async function id_posts_media_get(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const query = getQueryParams(req.query as Query);
    const mediaType = getLastPathWord(req.originalUrl);

    const posts = await PostService.getUserPostsWithMedia(
      userId,
      mediaType,
      query
    );

    return res.json({ posts });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at id_posts_get, user controller", err });
  }
}

async function id_friends_get(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const friends = await FriendshipService.getUserFriends(userId);

    return res.json(friends);
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at id_friends_get, user controller", err });
  }
}

async function id_put(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const update = req.body as UserUpdate;

    if (update.password) {
      const hashedPassword = await hashPassword(update.password);
      update.password = hashedPassword;
    }
    await UserService.updateUser(userId, update);
    const updatedUser = await UserService.getUser(userId);

    return res.json({ user: updatedUser });
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at id_put, user controller", err });
  }
}

async function id_delete(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    await UserService.deleteUser(userId);
    await PostService.deleteUserPosts(userId);

    return res.json(userId);
  } catch (err) {
    return res
      .status(503)
      .json({ message: "Error at id_delete, user controller", err });
  }
}

export default {
  get,
  id_get,
  id_posts_get,
  id_friends_get,
  id_posts_media_get,
  id_delete,
  id_put,
};
