import express from "express";
import PostController from "../controllers/post.controller";
const router = express.Router();

router.get("/", PostController.posts_get);

export default router;
