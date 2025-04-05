import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shopName: {
    type: String,
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
  }
}, {
  timestamps: true
});

export default mongoose.model('Post', postSchema);
