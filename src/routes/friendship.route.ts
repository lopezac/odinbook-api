import express from "express";
import FriendshipController from "../controllers/friendship.controller";
import AuthMiddleware from "../middleware/auth.middleware";
const router = express.Router();

router.post("/", AuthMiddleware.JwtAuth(), FriendshipController.post);

router.get("/", FriendshipController.get);

router.delete(
  "/",
  AuthMiddleware.JwtAuth(),
  FriendshipController.friendships_delete
);

export default router;
