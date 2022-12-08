import express from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import LikeController from "../controllers/like.controller";

const router = express.Router();

router.post("/", AuthMiddleware.JwtAuth(), LikeController.likes_post);

router.get("/", LikeController.likes_get);

router.get("/count", LikeController.likes_count_get);

router.delete("/", AuthMiddleware.JwtAuth(), LikeController.likes_delete);

export default router;
