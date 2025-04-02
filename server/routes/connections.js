import express from 'express';
import { protect } from '../middleware/auth.js';
import Connection from '../models/Connection.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';

const router = express.Router();

// Get all connections for the current user
router.get('/', protect, async (req, res) => {
  try {
    const connections = await Connection.find({
      $or: [{ fromUser: req.user._id }, { toUser: req.user._id }],
      status: 'accepted'
    }).populate('fromUser toUser', 'name shopName role');

    res.json(connections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send connection request
router.post('/request', protect, async (req, res) => {
  try {
    const { toUserId, message } = req.body;

    // Check if connection already exists
    const existingConnection = await Connection.findOne({
      $or: [
        { fromUser: req.user._id, toUser: toUserId },
        { fromUser: toUserId, toUser: req.user._id }
      ]
    });

    if (existingConnection) {
      return res.status(400).json({ message: 'Connection already exists' });
    }

    const connection = await Connection.create({
      fromUser: req.user._id,
      toUser: toUserId,
      message,
      status: 'pending'
    });

    // Create notification for recipient
    await Notification.create({
      user: toUserId,
      type: 'connection',
      title: 'New Connection Request',
      message: `${req.user.shopName} wants to connect with you`,
      relatedModel: 'Connection',
      relatedId: connection._id
    });

    res.status(201).json(connection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept/Reject connection request
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const connection = await Connection.findById(req.params.id);

    if (!connection) {
      return res.status(404).json({ message: 'Connection not found' });
    }

    if (connection.toUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    connection.status = status;
    await connection.save();

    // Create notification for sender
    await Notification.create({
      user: connection.fromUser,
      type: 'connection',
      title: 'Connection Request Updated',
      message: `${req.user.shopName} has ${status} your connection request`,
      relatedModel: 'Connection',
      relatedId: connection._id
    });

    res.json(connection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove connection
router.delete('/:id', protect, async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id);

    if (!connection) {
      return res.status(404).json({ message: 'Connection not found' });
    }

    if (![connection.fromUser.toString(), connection.toUser.toString()].includes(req.user._id.toString())) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await connection.deleteOne();

    // Notify other user about connection removal
    const otherUserId = connection.fromUser.toString() === req.user._id.toString() 
      ? connection.toUser 
      : connection.fromUser;

    await Notification.create({
      user: otherUserId,
      type: 'connection',
      title: 'Connection Removed',
      message: `${req.user.shopName} has removed the connection`,
      relatedModel: 'Connection',
      relatedId: connection._id
    });

    res.json({ message: 'Connection removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;