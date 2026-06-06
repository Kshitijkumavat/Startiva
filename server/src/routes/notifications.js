const router = require("express").Router();
const {
  getNotifications, markRead,
  markAllRead, deleteNotification,
} = require("../controllers/notifications.controller");
const { authenticate } = require("../middleware/auth");

router.get("/", authenticate, getNotifications);
router.put("/read-all", authenticate, markAllRead);
router.put("/:id/read", authenticate, markRead);
router.delete("/:id", authenticate, deleteNotification);

module.exports = router;