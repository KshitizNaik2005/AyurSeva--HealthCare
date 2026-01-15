//middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token and extract user info
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) {
    return res.status(401).json({ msg: '🔒 No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user data from token to request object
    req.user = {
      userId: decoded.id,
      role: decoded.role
    };

    next();
  } catch (err) {
    return res.status(403).json({ msg: '❌ Invalid or expired token' });
  }
};

/**
 * Middleware to check if user has required role(s)
 * @param {string|string[]} roles - one role (e.g. 'doctor') or array of roles (e.g. ['doctor', 'admin'])
 */
const checkRole = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ msg: 'Unauthorized: No user data in token' });
  }

  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      msg: `⛔ Access denied: requires role ${allowedRoles.join(' or ')}`,
    });
  }

  next();
};

module.exports = { verifyToken, checkRole };
