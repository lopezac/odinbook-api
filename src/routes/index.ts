import express from "express";
import authRouter from "./auth.route";
// import userRouter from "./user.route";
// import postRouter from "./post.route";
// import commentRouter from "./comment.route";
// import friendRequestRouter from "./friendRequest.route";
// import messageRouter from "./message.route";

const router = express.Router();

router.use("/", authRouter);
// router.use("/users", userRouter);
// router.use("/posts", postRouter);
// router.use("/comments", commentRouter);
// router.use("/messages", messageRouter);
// router.use("/friend-requests", friendRequestRouter);

export default router;
