import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createPost } from "../controllers/postControllers.js";

const postRoutes = express.Router();

// New post
postRoutes.post('/add', verifyToken, createPost);

export default postRoutes;