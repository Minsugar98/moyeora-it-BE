import prisma from '../config/prisma.js';

const getNotification = async (userId, size, cursor) => {
  const notifications = await prisma.notification.findMany({
    where: {
      user_id: userId,
    },
    take: size,
    skip: cursor,
    orderBy: {
      created_at: 'desc',
    },
  });

  const hasNext = notifications.length === size;
  const nextCursor = hasNext ? cursor + size : null;

  return {
    items: notifications,
    hasNext,
    cursor: nextCursor,
    totalCount: notifications.length,
  };
};

const readNotification = async (userId, notificationId) => {
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId, user_id: userId },
  });
  if (!notification) {
    throw new Error('알림을 찾을 수 없습니다.');
  }

  return await prisma.notification.update({
    where: { id: notificationId, user_id: userId },
    data: { read: true },
  });
};

const deleteNotification = async (userId, notificationId) => {
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId, user_id: userId },
  });
  if (!notification) {
    throw new Error('알림을 찾을 수 없습니다.');
  }
  const deletedNotification = await prisma.notification.delete({
    where: { id: notificationId, user_id: userId },
  });
  return deletedNotification;
};

const deleteAllNotification = async (userId) => {
  const deletedNotification = await prisma.notification.deleteMany({
    where: { user_id: userId },
  });
  return deletedNotification;
};

const getNotificationCount = async (userId) => {
  const notificationCount = await prisma.notification.count({
    where: { user_id: userId, read: false },
  });
  return { unreadCount: notificationCount };
};

const createNotification = async (
  targetUserId,
  message,
  notificationType,
  url
) => {
  const notification = await prisma.notification.create({
    data: {
      user_id: targetUserId,
      content: message,
      type: notificationType,
      url: url,
      read: false,
    },
  });
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
