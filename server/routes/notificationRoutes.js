import express from 'express';
const router = express.Router();
import { getNotifications, markAllAsRead } from '../controllers/notificationController.js';
// const authMiddleware = require('../middleware/authMiddleware'); // Ensure the user is authenticated

router.get('/', getNotifications);
router.post('/mark-all-read', markAllAsRead);

export default router