import Post from "../models/Post.js";
import User from '../models/User.js';
import jwt from "jsonwebtoken";

// Middleware to verify JWT
export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });
  
  // Extract the token from "Bearer <token>" format
  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT verification error:", err); // Log error for debugging
      return res.status(403).json({ message: "Invalid token." });
    }
    console.log("Decoded user:", user); // Log the decoded user for debugging
    req.user = user; // Attach user information to the request object
    next();
  });
};

// Controller to create a new post
export const createPost = async (req, res) => {
  try {
    const { items ,deadline } = req.body;

    // Check if items is provided and has data
    if (!items || items.length === 0) {
      return res.status(500).json({ message: "Items are required" });
    }
    // Get userId and shopName from JWT token
    const { _id: userId, shopName } = req.user;
    // Save data to database
    const newPost = new Post({
      userId,
      shopName,
      items,
      deadline,
    });

    const savedPost = await newPost.save();
    res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Fetch posts from connected users
export const getConnectedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('connected', '_id');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const connectedUserIds = user.connected.map((conn) => conn._id);
    const posts = await Post.find({ userId: { $in: connectedUserIds } });
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user._id;

    // Convert page and limit to integers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Fetch posts only for the logged-in user with pagination
    const posts = await Post.find({ userId })
      .populate("userId", "ownerName email")
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .exec();

    // Count total posts for pagination
    const total = await Post.countDocuments({ userId });

    res.status(200).json({
      posts,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const changeStatus = async (req, res) => {
  try {
    const { postId, status } = req.user;
    const updatedPost = await Post.findByIdAndUpdate(postId, { status }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
