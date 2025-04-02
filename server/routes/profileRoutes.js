import express from 'express';
import { protect } from '../middleware/auth.js';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const router = express.Router();

router.get('/getProfile', protect, getProfile);
router.put('/updateProfile', protect, updateProfile);

export default router;