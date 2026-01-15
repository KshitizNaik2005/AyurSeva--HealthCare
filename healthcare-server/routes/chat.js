// routes/chat.js

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User'); // ensure User model is imported
const Appointment = require('../models/Appointment');
const { verifyToken } = require('../middleware/authMiddleware');

// 🆕 Add this route
router.get('/patients/with-appointments', verifyToken, async (req, res) => {
  try {
    const doctorId = req.user.userId;

    const appointments = await Appointment.find({ doctor: doctorId, status: 'approved' }).populate('patient');

    const uniquePatients = {};
    appointments.forEach(appt => {
      if (appt.patient && appt.patient._id) {
        uniquePatients[appt.patient._id] = appt.patient;
      }
    });

    res.json(Object.values(uniquePatients));
  } catch (err) {
    console.error('❌ Error fetching patients:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Existing history route
router.get('/history/:receiverId', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const receiverId = req.params.receiverId;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ]
    }).sort('timestamp');

    res.json(messages);
  } catch (err) {
    console.error('❌ Error fetching chat history:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
