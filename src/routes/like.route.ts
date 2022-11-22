import express from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import LikeController from "../controllers/like.controller";

const router = express.Router();

router.post("/", AuthMiddleware.JwtAuth(), LikeController.comments_post);

export default router;
