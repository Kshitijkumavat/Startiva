const router = require("express").Router();
const {
  getDeals, getDeal, createDeal,
  updateDeal, updateStage, deleteDeal,
} = require("../controllers/deals.controller");
const { authenticate } = require("../middleware/auth");
const { requireRole } = require("../middleware/role");

router.get("/", authenticate, getDeals);
router.get("/:id", authenticate, getDeal);
router.post("/", authenticate, createDeal);
router.put("/:id", authenticate, updateDeal);
router.put("/:id/stage", authenticate, updateStage);
router.delete("/:id", authenticate, requireRole("OWNER", "ADMIN"), deleteDeal);

module.exports = router;