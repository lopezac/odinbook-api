import express from "express";
import FriendReqController from "../controllers/friendRequest.controller";
import FriendReqValidation from "../middleware/friendRequest.validation";
import AuthMiddleware from "../middleware/auth.middleware";
const router = express.Router();

router.post(
  "/",
  AuthMiddleware.JwtAuth(),
  FriendReqValidation.post,
  FriendReqController.post
);

router.get(
  "/", 
  AuthMiddleware.JwtAuth(),
  FriendReqController.get
);

router.post("/:id", AuthMiddleware.JwtAuth(), FriendReqController.id_post);

router.delete("/:id", AuthMiddleware.JwtAuth(), FriendReqController.id_delete);

export default router;
