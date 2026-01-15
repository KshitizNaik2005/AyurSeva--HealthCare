const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// Accessible by any authenticated user
router.get('/', verifyToken, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.role} 👋`,
    user: req.user
  });
});

// Doctor-only route
router.get('/doctor', verifyToken, checkRole('doctor'), (req, res) => {
  res.json({
    message: 'Doctor dashboard access granted',
    user: req.user
  });
});

// Patient-only route
router.get('/patient', verifyToken, checkRole('patient'), (req, res) => {
  res.json({
    message: 'Patient dashboard access granted',
    user: req.user
  });
});

module.exports = router;
