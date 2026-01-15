const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken, checkRole } = require('../middleware/authMiddleware'); // ✅ Updated import

// @route    PUT /api/doctor/slots
// @desc     Doctor sets or updates available time slots
// @access   Private (doctor only)
router.put('/slots', verifyToken, checkRole('doctor'), async (req, res) => {
  try {
    const userId = req.user.userId; // req.user injected by verifyToken
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const { date, slots } = req.body;

    if (!date || !slots || !Array.isArray(slots)) {
      return res.status(400).json({ message: 'Invalid input. Date and slots (array) are required.' });
    }

    // Check if date already exists in availableSlots
    const existingSlotIndex = user.availableSlots.findIndex(s => s.date === date);

    if (existingSlotIndex >= 0) {
      // Update existing slot entry
      user.availableSlots[existingSlotIndex].slots = slots;
    } else {
      // Add new slot entry
      user.availableSlots.push({ date, slots });
    }

    await user.save();

    return res.status(200).json({
      message: '✅ Slots updated successfully',
      availableSlots: user.availableSlots,
    });

  } catch (err) {
    console.error('Error updating slots:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
