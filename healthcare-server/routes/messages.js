// routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { verifyToken } = require('../middleware/authMiddleware');

// @route   GET /api/messages/:userId
// @desc    Fetch all messages between logged-in user and another user
// @access  Private
router.get('/:userId', verifyToken, async (req, res) => {
  const currentUserId = req.user.userId;
  const otherUserId = req.params.userId;

  try {
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    console.error('❌ Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to load messages' });
  }
});

// @route   POST /api/messages/send
// @desc    Send a message (save to DB)
// @access  Private
router.post('/send', verifyToken, async (req, res) => {
  const { from, to, content } = req.body;

  if (!from || !to || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newMessage = new Message({
      sender: from,
      receiver: to,
      content,
      timestamp: new Date()
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (err) {
    console.error('❌ Error saving message:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
