import express from "express";
import { authLogin, authRegister, authLogout } from "../controllers/authControllers.js";

const authRoutes = express.Router();

authRoutes.post('/login', authLogin);
authRoutes.post('/register', authRegister);
authRoutes.post('/logout', authLogout);

export default authRoutes;