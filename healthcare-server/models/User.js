// models/User.js
const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  day: String, // e.g., 'Monday'
  slots: [String] // e.g., ['10:00 AM', '11:30 AM']
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    default: 'patient'
  },
  availableSlots: [timeSlotSchema] // ✅ For doctors only
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
