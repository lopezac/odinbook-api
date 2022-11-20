import express from "express";
import FriendshipController from "../controllers/friendship.controller";
const router = express.Router();

router.delete("/:id", FriendshipController.id_delete);

export default router;
