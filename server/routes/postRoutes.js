import express from "express";
import { authenticateToken, createPost } from "../controllers/postController.js";
import { getConnectedPosts, getAllPosts, changeStatus } from '../controllers/postController.js';


const router = express.Router();

// Route to create a post
router.post("/post-requirement", authenticateToken, createPost);
router.get('/requirements', authenticateToken, getConnectedPosts); // Get posts of connected users
router.get('/getmyposts',authenticateToken,getAllPosts);
router.post('/changeStatus', authenticateToken, changeStatus);
export default router;