import express from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import PostController from "../controllers/post.controller";
const router = express.Router();

router.get("/", PostController.posts_get);

router.get("/:postId", PostController.posts_id_get);

router.post("/", AuthMiddleware.JwtAuth(), PostController.posts_post);

router.put("/:postId", AuthMiddleware.JwtAuth(), PostController.posts_put);

export default router;
