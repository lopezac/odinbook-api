import { ReturnQuery } from "../types/request.types";
import { NotificationType } from "../types/notification.types";
import Notification from "../models/notification.model";

const getNotifications = async ({ filter, page, sort }: ReturnQuery) => {
  try {
    return await Notification.find(filter).exec();
  } catch (err) {
    return new Error(
      `Error getting notifications, notification service, error: ${err}`
    );
  }
};

const createNotification = async (data: NotificationType) => {
  try {
    return await Notification.create(data);
  } catch (err) {
    return new Error(
      `Error creating notification, notification service, error: ${err}`
    );
  }
};

const deleteNotification = async (id: string) => {
  try {
    return await Notification.findByIdAndDelete(id).exec();
  } catch (err) {
    return new Error(
      `Error deleting notification, notification service, error: ${err}`
    );
  }
};

export default { createNotification, getNotifications, deleteNotification };
