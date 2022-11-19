import express from "express";
import UserController from "../controllers/user.controller";
// import UserVal from "../middleware/user.validation";

const router = express.Router();

router.get("/", UserController.users_get);

router.get("/:userId", UserController.users_id_get);

router.get("/:userId/photos", UserController.users_id_posts_get);

router.get("/:userId/videos", UserController.users_id_posts_get);

router.get("/:userId/friends", UserController.users_id_friends_get);

export default router;
