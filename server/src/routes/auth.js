const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ success: true, message: "Auth route ready" });
});

module.exports = router;