import mongoose from 'mongoose';

const requirementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    unit: {
      type: String,
      required: true
    }
  }],
  deadline: {
    type: Date,
    required: [true, 'Deadline is required']
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'expired'],
    default: 'open'
  },
  category: {
    type: String,
    enum: ['medical', 'equipment', 'pharmaceuticals', 'other'],
    default: 'medical'
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'connections'],
    default: 'public'
  },
  views: {
    type: Number,
    default: 0
  },
  quoteReceived:[{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
}, {
  timestamps: true
});

// Index for searching
requirementSchema.index({ items: [], deadline: 1 });

// Auto-expire requirements
requirementSchema.index({ deadline: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Requirement', requirementSchema);