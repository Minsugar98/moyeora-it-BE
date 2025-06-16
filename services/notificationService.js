import notificationRepository from '../repositorys/notificationRepository.js';

const getNotification = async (userId, size, cursor) => {
  const notifications = await notificationRepository.getNotification(
    userId,
    size,
    cursor
  );
  return notifications;
};

const readNotification = async (userId, notificationId) => {
  const notification = await notificationRepository.readNotification(
    userId,
    notificationId
  );
  return notification;
};

const deleteNotification = async (userId, notificationId) => {
  const notification = await notificationRepository.deleteNotification(
    userId,
    notificationId
  );
  return notification;
};

const deleteAllNotification = async (userId) => {
  const notification = await notificationRepository.deleteAllNotification(
    userId
  );
  return notification;
};

const getNotificationCount = async (userId) => {
  const notificationCount = await notificationRepository.getNotificationCount(
    userId
  );
  return notificationCount;
};

const createNotification = async (
  targetUserId,
  message,
  notificationType,
  url
) => {
  const notification = await notificationRepository.createNotification(
    targetUserId,
    message,
    notificationType,
    url
  );
  return notification;
};

export default {
  getNotification,
  readNotification,
  deleteNotification,
  deleteAllNotification,
  getNotificationCount,
  createNotification,
};
