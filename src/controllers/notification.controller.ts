import { Request, Response } from "express";
import { Query } from "../types/request.types";
import { NotificationType } from "../types/notification.types";
import { getQueryParams } from "../utils/query.helper";
import NotificationService from "../services/notification.service";

const notifications_get = async (req: Request, res: Response) => {
  try {
    const query = getQueryParams(req.query as Query);

    const notifications = await NotificationService.getNotifications(query);

    return res.json({ notifications });
  } catch (err) {
    return res.status(503).json({
      message: "Error at notifications_get, notification controller",
      err,
    });
  }
};

const notifications_post = async (req: Request, res: Response) => {
  try {
    const data = req.body as NotificationType;

    const notification = await NotificationService.createNotification(data);

    return res.json({ notification });
  } catch (err) {
    return res.status(503).json({
      message: "Error at notifications_post, notification controller",
      err,
    });
  }
};

const notifications_id_delete = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;

    await NotificationService.deleteNotification(notificationId);

    return res.json({ notificationId });
  } catch (err) {
    return res.status(503).json({
      message: "Error at notifications_id_delete, notification controller",
      err,
    });
  }
};

export default {
  notifications_post,
  notifications_get,
  notifications_id_delete,
};
