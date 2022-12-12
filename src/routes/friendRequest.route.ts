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

router.get("/", FriendReqController.get);

router.delete("/", AuthMiddleware.JwtAuth(), FriendReqController.id_delete);

router.post("/:id", AuthMiddleware.JwtAuth(), FriendReqController.id_post);

export default router;
