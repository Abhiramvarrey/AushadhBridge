import express from 'express';
import { protect } from '../middleware/auth.js';
import Quote from '../models/Quote.js';
import Requirement from '../models/Requirement.js';
import Notification from '../models/Notification.js';
import Connection from '../models/Connection.js';

const router = express.Router();

// Get all quotes for the current user
router.get('/', protect, async (req, res) => {
  try {
    const quotes = await Quote.find({
      $or: [{ fromUser: req.user._id }, { toUser: req.user._id }]
    }).populate('requirement fromUser toUser', 'title shopName');

    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send a quote (public or private)
router.post('/', protect, async (req, res) => {
  try {
    const { requirementId, items, totalPrice, notes, deliveryTime, isPrivate } = req.body;

    const requirement = await Requirement.findById(requirementId);
    if (!requirement) {
      return res.status(404).json({ message: 'Requirement not found' });
    }

    // If private quote, check if connection exists
    if (isPrivate) {
      const connection = await Connection.findOne({
        $or: [
          { fromUser: req.user._id, toUser: requirement.user },
          { fromUser: requirement.user, toUser: req.user._id }
        ],
        status: 'accepted'
      });

      if (!connection) {
        return res.status(403).json({ 
          message: 'You must be connected with the requirement owner to send a private quote' 
        });
      }
    }

    const quote = await Quote.create({
      requirement: requirementId,
      fromUser: req.user._id,
      toUser: requirement.user,
      items,
      totalPrice,
      notes,
      deliveryTime,
      isPrivate,
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours validity
    });

    // Add quote reference to requirement
    requirement.quotes.push(quote._id);
    await requirement.save();

    // Create notification for requirement owner
    await Notification.create({
      user: requirement.user,
      type: 'quote',
      title: 'New Quote Received',
      message: `${req.user.shopName} has sent you a ${isPrivate ? 'private' : ''} quote`,
      relatedModel: 'Quote',
      relatedId: quote._id
    });

    res.status(201).json(quote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept/Reject quote
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    if (quote.toUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    quote.status = status;
    await quote.save();

    // Create notification for quote sender
    await Notification.create({
      user: quote.fromUser,
      type: 'quote',
      title: 'Quote Status Updated',
      message: `Your quote has been ${status}`,
      relatedModel: 'Quote',
      relatedId: quote._id
    });

    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;