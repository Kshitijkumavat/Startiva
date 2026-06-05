const router = require("express").Router();
const { getMembers, inviteMember, acceptInvite, updateRole, removeMember } = require("../controllers/team.controller");
const { authenticate } = require("../middleware/auth");
const { requireRole } = require("../middleware/role");

router.get("/members", authenticate, getMembers);
router.post("/invite", authenticate, requireRole("OWNER", "ADMIN"), inviteMember);
router.post("/accept-invite", acceptInvite);
router.put("/members/:id/role", authenticate, requireRole("OWNER", "ADMIN"), updateRole);
router.delete("/members/:id", authenticate, requireRole("OWNER", "ADMIN"), removeMember);

module.exports = router;