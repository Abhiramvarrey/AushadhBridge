import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true // Index for querying quotes by user
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true // Index for querying quotes by user
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
    required: true,
    index: { expires: '0s' } // TTL index to auto-expire quotes after validity period
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

export default mongoose.model('Quote', quoteSchema);
