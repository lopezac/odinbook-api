import express from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import NotificationCont from "../controllers/notification.controller";

const router = express.Router();

router.get("/", NotificationCont.notifications_get);

router.post("/", AuthMiddleware.JwtAuth(), NotificationCont.notifications_post);

router.delete(
  "/:notificationId",
  AuthMiddleware.JwtAuth(),
  NotificationCont.notifications_id_delete
);

export default router;
