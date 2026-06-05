const router = require("express").Router();
const {
  getProposals, getProposal, createProposal,
  updateProposal, aiDraft, sendProposal,
} = require("../controllers/proposals.controller");
const { authenticate } = require("../middleware/auth");
const { requireRole } = require("../middleware/role");

router.get("/", authenticate, getProposals);
router.get("/:id", authenticate, getProposal);
router.post("/", authenticate, createProposal);
router.put("/:id", authenticate, updateProposal);
router.post("/ai-draft", authenticate, requireRole("OWNER", "ADMIN"), aiDraft);
router.post("/:id/send", authenticate, requireRole("OWNER", "ADMIN"), sendProposal);

module.exports = router;