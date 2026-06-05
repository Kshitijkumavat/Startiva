const router = require("express").Router();
const {
  getPayments, getPayment, createPayment,
  updateStatus, updatePayment, deletePayment,
} = require("../controllers/payments.controller");
const { authenticate } = require("../middleware/auth");
const { requireRole } = require("../middleware/role");

router.get("/", authenticate, requireRole("OWNER", "ADMIN"), getPayments);
router.get("/:id", authenticate, requireRole("OWNER", "ADMIN"), getPayment);
router.post("/", authenticate, requireRole("OWNER", "ADMIN"), createPayment);
router.put("/:id", authenticate, requireRole("OWNER", "ADMIN"), updatePayment);
router.put("/:id/status", authenticate, requireRole("OWNER", "ADMIN"), updateStatus);
router.delete("/:id", authenticate, requireRole("OWNER", "ADMIN"), deletePayment);

module.exports = router;