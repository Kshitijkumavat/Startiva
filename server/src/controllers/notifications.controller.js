const prisma = require("../utils/prisma");
const { success, error } = require("../utils/response");

async function getNotifications(req, res) {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  return success(res, { notifications, unreadCount });
}

async function markRead(req, res) {
  const notification = await prisma.notification.findFirst({
    where: { id: req.params.id, userId: req.user.id },
  });
  if (!notification) return error(res, "Notification not found", 404);

  const updated = await prisma.notification.update({
    where: { id: req.params.id },
    data: { read: true },
  });

  return success(res, updated);
}

async function markAllRead(req, res) {
  await prisma.notification.updateMany({
    where: { userId: req.user.id, read: false },
    data: { read: true },
  });

  return success(res, { message: "All notifications marked as read" });
}

async function deleteNotification(req, res) {
  const notification = await prisma.notification.findFirst({
    where: { id: req.params.id, userId: req.user.id },
  });
  if (!notification) return error(res, "Notification not found", 404);

  await prisma.notification.delete({ where: { id: req.params.id } });
  return success(res, { message: "Notification deleted" });
}

module.exports = { getNotifications, markRead, markAllRead, deleteNotification };