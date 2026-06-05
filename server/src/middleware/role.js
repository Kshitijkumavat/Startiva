const { error } = require("../utils/response");

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return error(res, "Unauthorized", 401);
    if (!roles.includes(req.user.role)) {
      return error(res, "You do not have permission to do this", 403);
    }
    next();
  };
}

module.exports = { requireRole };