// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/authMiddleware'); // ✅ Secures route

// @route    GET /api/users/doctors
// @desc     Get all doctors (for patient chat or appointment)
// @access   Private
router.get('/doctors', verifyToken, async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-password');

    res.json(doctors);
  } catch (err) {
    console.error('❌ Error fetching doctors:', err.message);
    res.status(500).json({ error: 'Server error while fetching doctors' });
  }
});


// ✅ GET user by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('❌ Error fetching user:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});



router.get('/patients', verifyToken, async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }).select('name email');
    res.json(patients);
  } catch (err) {
    console.error('Error fetching patients:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
