import express from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import ChatController from "../controllers/chat.controller";

const router = express.Router();

router.post("/", AuthMiddleware.JwtAuth(), ChatController.chats_post);

router.delete(
  "/:chatId",
  AuthMiddleware.JwtAuth(),
  ChatController.chats_id_delete
);

router.get("/:chatId/messages", ChatController.chats_id_msgs_get);

export default router;
