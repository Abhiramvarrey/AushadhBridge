import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  mobile: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['hospital', 'clinic', 'supplier', 'distributor','pharmacy'],
    required: [true, 'Role is required']
  },
  shopName: {
    type: String,

    required: [true, 'Shop name is required'],
    trim: true
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium', 'enterprise'],
      default: 'free'
    },
    validUntil: {
      type: Date,
      // default: () => new Date(+new Date() + 30*24*60*60*1000) // 30 days from now
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  shopLocation: { type: String, required: true },
  connected: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  pending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  requested: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  GSTIN: String,
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);