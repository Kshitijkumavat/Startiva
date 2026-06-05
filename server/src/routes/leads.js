const router = require("express").Router();
const { getLeads, getLead, createLead, updateLead, deleteLead, assignLead } = require("../controllers/leads.controller");
const { authenticate } = require("../middleware/auth");
const { requireRole } = require("../middleware/role");

router.get("/", authenticate, getLeads);
router.get("/:id", authenticate, getLead);
router.post("/", authenticate, createLead);
router.put("/:id", authenticate, updateLead);
router.delete("/:id", authenticate, requireRole("OWNER", "ADMIN"), deleteLead);
router.put("/:id/assign", authenticate, assignLead);

module.exports = router;