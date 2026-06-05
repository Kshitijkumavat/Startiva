const router = require("express").Router();
const {
  getMeetings, getMeeting, createMeeting,
  updateMeeting, toggleActionItem, deleteMeeting,
} = require("../controllers/meetings.controller");
const { authenticate } = require("../middleware/auth");

router.get("/", authenticate, getMeetings);
router.get("/:id", authenticate, getMeeting);
router.post("/", authenticate, createMeeting);
router.put("/:id", authenticate, updateMeeting);
router.put("/:id/action-item", authenticate, toggleActionItem);
router.delete("/:id", authenticate, deleteMeeting);

module.exports = router;