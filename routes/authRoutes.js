import express from "express";
import { authLogin, authRegister } from "../controllers/authControllers.js";

const authRoutes = express.Router();

authRoutes.post('/login', authLogin);
authRoutes.post('/register', authRegister);

export default authRoutes;