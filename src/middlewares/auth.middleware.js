const { verifyAccessToken } = require("../utils/jwt");

function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  
  // Cek apakah ada header Authorization: Bearer <token>
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Missing or invalid Authorization header",
      cid: req.correlationId,
    });
  }

  const token = header.replace("Bearer ", "").trim();

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // Simpan data user (id, role) ke request
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      cid: req.correlationId,
    });
  }
}

module.exports = verifyToken;