import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  message: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['direct', 'requirement'],
    default: 'direct'
  },
  requirement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Requirement'
  }
}, {
  timestamps: true
});

// Ensure unique connections
connectionSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });

export default mongoose.model('Connection', connectionSchema);