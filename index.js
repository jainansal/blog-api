import express from "express";
import cors from 'cors';
import fs from 'fs';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

// Configurations

dotenv.config();
const app = express();
app.use(cors({
    credentials: true, origin: 'https://blogin77.vercel.app'
}));
app.use(express.json());
app.use(cookieParser());

// Routes

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);

// Database connection

connectDB();

// Ports

const port = process.env.PORT || 4142;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/', (req,res) => {
    res.send('Server is up and running');
});