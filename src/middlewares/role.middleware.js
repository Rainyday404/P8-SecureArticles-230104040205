function requireRole(...roles) {
  return (req, res, next) => {
    // Cek apakah data user ada (dari verifyToken) & apakah role-nya sesuai
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Insufficient role",
        cid: req.correlationId,
      });
    }
    next();
  };
}

module.exports = requireRole;