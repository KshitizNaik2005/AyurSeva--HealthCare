
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail'); // ✅ Email util

// ------------------------------
// @route    POST /api/appointments/book
// @desc     Patient books an appointment (Pending by default)
// @access   Private (Patient only)
router.post('/book', verifyToken, checkRole('patient'), async (req, res) => {
  try {
    console.log('🧪 Authenticated user:', req.user);  // <--- Add this
    console.log('Received Appointment Request:', req.body);

    const { doctor, date, time, reason } = req.body;

    if (!doctor || !date || !time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const doctorExists = await User.findById(doctor);
    if (!doctorExists || doctorExists.role !== 'doctor') {
      return res.status(404).json({ message: 'Invalid doctor ID' });
    }

    const appointment = new Appointment({
      doctor,
      patient: req.user.userId,  // 👈 Confirm this is defined!
      date,
      time,
      reason,
      status: 'pending'
    });

    await appointment.save();
    console.log('✅ Appointment saved:', appointment);

    res.status(201).json({
      message: 'Appointment request sent for approval',
      appointment
    });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Server error while booking appointment' });
  }
});


// ------------------------------
// @route    GET /api/appointments/pending
// @desc     Doctor fetches all pending appointment requests
// @access   Private (Doctor only)
router.get('/doctor/pending', verifyToken, checkRole('doctor'), async (req, res) => {
  try {
    const doctorId = req.user.userId;
    console.log('🔍 Doctor ID:', req.user.userId);

    const pendingAppointments = await Appointment.find({
      doctor: doctorId,
      status: 'pending'
    }).populate('patient', 'name email');

    res.json(pendingAppointments);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Server error while fetching appointments' });
  }
});

// ------------------------------
// @route    PUT /api/appointments/:id/decision
// @desc     Doctor approves or rejects appointment
// @access   Private (Doctor only)
router.put('/:id/decision', verifyToken, checkRole('doctor'), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const appointment = await Appointment.findById(id)
      .populate('patient', 'email name _id')
      .populate('doctor', 'name');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.doctor._id.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    appointment.status = status;
    await appointment.save();

    // ✅ Email logic
    const patientEmail = appointment.patient.email;
    const doctorName = appointment.doctor.name;
    const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
    const subject = 'Appointment Status Update';
    const message =
      status === 'approved'
    ? `✅ Your appointment with Dr. ${doctorName} on ${appointmentDate} at ${appointment.time} has been *approved*.`
    : `❌ Unfortunately, your appointment with Dr. ${doctorName} on ${appointmentDate} at ${appointment.time} has been *rejected*.`;


    await sendEmail(patientEmail, subject, message);

    // ✅ Real-time notification (via Socket.io)
    const io = req.app.get('io');
    const connectedUsers = req.app.get('connectedUsers');
    const patientId = appointment.patient._id.toString();

    if (connectedUsers.has(patientId)) {
      const socketId = connectedUsers.get(patientId);
      io.to(socketId).emit('appointmentStatus', {
        status,
        date: appointment.date,
        time: appointment.time,
        doctor: doctorName
      });
      console.log(`📡 Sent real-time ${status} update to patient ${patientId}`);
    }

    res.json({
      message: `Appointment ${status}, email sent, and real-time notification delivered (if online)`,
      appointment
    });
  } catch (err) {
    console.error('Decision error:', err);
    res.status(500).json({ message: 'Server error while updating status' });
  }
});

// ------------------------------
// @route    GET /api/appointments/doctor/stats
// @desc     Get stats of approved and rejected appointments
// @access   Private (Doctor only)
router.get('/doctor/stats', verifyToken, checkRole('doctor'), async (req, res) => {
  try {
    const doctorId = req.user.userId;

    const approvedCount = await Appointment.countDocuments({
      doctor: doctorId,
      status: 'approved'
    });

    const rejectedCount = await Appointment.countDocuments({
      doctor: doctorId,
      status: 'rejected'
    });

    res.json({
      approved: approvedCount,
      rejected: rejectedCount
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ message: 'Server error while fetching stats' });
  }
});

// ------------------------------
// @route    GET /api/appointments/my
// @desc     Patient fetches their own appointment history
// @access   Private (Patient only)
router.get('/my', verifyToken, checkRole('patient'), async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.userId })
      .populate('doctor', 'name email')
      .sort({ date: -1 });

    res.json(appointments);
  } catch (err) {
    console.error('Patient fetch error:', err);
    res.status(500).json({ message: 'Server error fetching your appointments' });
  }
});

// GET /api/appointments/doctor/stats ✅ (for counts)
// Let's add this:
router.get('/doctor/history', verifyToken, checkRole('doctor'), async (req, res) => {
  try {
    const doctorId = req.user.userId;

    const history = await Appointment.find({
      doctor: doctorId,
      status: { $in: ['approved', 'rejected'] }
    }).populate('patient', 'name email').sort({ updatedAt: -1 });

    res.json(history);
  } catch (err) {
    console.error('History fetch error:', err);
    res.status(500).json({ message: 'Server error fetching appointment history' });
  }
});

module.exports = router;
