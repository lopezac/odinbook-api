import express from "express";
import FriendReqController from "../controllers/friendRequest.controller";
import FriendReqValidation from "../middleware/friendRequest.validation";
const router = express.Router();

router.post("/", FriendReqValidation.post, FriendReqController.post);

router.delete("/:id", FriendReqController.id_delete);

export default router;
