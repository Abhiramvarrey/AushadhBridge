import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  requirement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Requirement',
    required: true
  },
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
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    }
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  validUntil: {
    type: Date,
    required: true
  },
  notes: String,
  termsAndConditions: String,
  deliveryTime: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for querying quotes by user
quoteSchema.index({ fromUser: 1, toUser: 1 });

// Index for requirement reference
quoteSchema.index({ requirement: 1 });

// TTL index to auto-expire quotes after validity period
quoteSchema.index({ validUntil: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Quote', quoteSchema);