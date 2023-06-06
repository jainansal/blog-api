import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.get('/my', verifyToken, getProfile);

export default userRoutes;