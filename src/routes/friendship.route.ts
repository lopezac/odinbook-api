import express from "express";
import FriendshipController from "../controllers/friendship.controller";
import AuthMiddleware from "../middleware/auth.middleware";
const router = express.Router();

router.delete("/:id", AuthMiddleware.JwtAuth(), FriendshipController.id_delete);

export default router;
