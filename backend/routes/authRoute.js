import express from "express";
const router = express.Router();
import { registerUserCtrl, loginUserCtrl } from "../controllers/authController.js";

// /api/auth/register
router.post("/register", registerUserCtrl);

// /api/auth/login
router.post("/login", loginUserCtrl);



export default router;
