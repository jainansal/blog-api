import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
    createPost,
    getRecent,
    getOne,
    updateOne
} from "../controllers/postControllers.js";

const postRoutes = express.Router();

// Create
postRoutes.post('/add', verifyToken, createPost);

// Read
postRoutes.get('/recent', getRecent);
postRoutes.get('/:id', getOne);

// Update
postRoutes.put('/:id', verifyToken, updateOne);

export default postRoutes;