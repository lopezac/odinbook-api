import express from "express";
import authRouter from "./auth.route";
import postRouter from "./post.route";
import userRouter from "./user.route";
import friendRequestRouter from "./friendRequest.route";
import friendshipRouter from "./friendship.route";
import likeRouter from "./like.route";
import commentRouter from "./comment.route";
import chatRouter from "./chat.route";
import messageRouter from "./message.route";
import notificationRouter from "./notification.route";

const router = express.Router();

router.use("/", authRouter); // try to do authRouter, uploadRouter maybe
router.use("/posts", postRouter);
router.use("/users", userRouter);
router.use("/friend-requests", friendRequestRouter);
router.use("/friendships", friendshipRouter);
router.use("/likes", likeRouter);
router.use("/comments", commentRouter);
router.use("/messages", messageRouter);
router.use("/chats", chatRouter);
router.use("/notifications", notificationRouter);

export default router;
