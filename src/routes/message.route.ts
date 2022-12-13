import express from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import MsgController from "../controllers/message.controller";

const router = express.Router();

router.post("/", AuthMiddleware.JwtAuth(), MsgController.messages_post);

router.delete(
  "/:messageId",
  AuthMiddleware.JwtAuth(),
  MsgController.messages_id_delete
);

export default router;
