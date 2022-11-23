import express from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import CommentController from "../controllers/comment.controller";

const router = express.Router();

router.post("/", AuthMiddleware.JwtAuth(), CommentController.comments_post);

router.get("/:commentId", CommentController.comments_id_get);

router.get("/:commentId/likes", CommentController.comments_id_likes_get);

router.put(
  "/:commentId",
  AuthMiddleware.JwtAuth(),
  CommentController.comments_id_put
);

router.delete(
  "/:commentId",
  AuthMiddleware.JwtAuth(),
  CommentController.comments_id_delete
);

export default router;
