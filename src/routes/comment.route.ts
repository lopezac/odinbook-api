import express from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import CommentController from "../controllers/comment.controller";
import CommentVal from "../middleware/comment.validation";

const router = express.Router();

router.post(
  "/",
  CommentVal.create,
  AuthMiddleware.JwtAuth(),
  CommentController.comments_post
);

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
