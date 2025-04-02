import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import {protect} from './middleware/auth.js';
// import requirementRoutes from './routes/requirements.js';
// import quoteRoutes from './routes/quotes.js';
// import shopRoutes from './routes/shops.js';
// import notificationRoutes from './routes/notifications.js';
// import connectionRoutes from './routes/connections.js';
import { errorHandler } from './middleware/errorHandler.js';
import {authRoutes} from './routes/authRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
dotenv.config();

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(limiter);
// Connect to MongoDBs
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/requirements', requirementRoutes);
// app.use('/api/quotes', quoteRoutes);
// app.use('/api/shops', shopRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/connections', connectionRoutes);

// Error handling
app.use(errorHandler);

// Handle unhandled routes
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

app.use('/api',authRoutes);
app.use('/api',notificationRoutes);
app.use('/api',profileRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});