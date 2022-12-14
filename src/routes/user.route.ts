import express from "express";
import UserController from "../controllers/user.controller";
import AuthMiddleware from "../middleware/auth.middleware";
import AuthVal from "../middleware/auth.validation";

const router = express.Router();

router.get("/", UserController.get);

router.get("/:userId", UserController.id_get);

router.get("/:userId/posts", UserController.id_posts_get);

router.get("/:userId/photos", UserController.id_posts_media_get);

router.get("/:userId/videos", UserController.id_posts_media_get);

router.get("/:userId/friends", UserController.id_friends_get);

router.get("/:userId/chats", UserController.id_chats_get);

router.delete("/:userId", AuthMiddleware.JwtAuth(), UserController.id_delete);

router.put(
  "/:userId",
  AuthVal.update,
  AuthMiddleware.JwtAuth(),
  UserController.id_put
);

export default router;
