import express from "express";
import { registerUser, loginUser, logoutUser, getMe, verifyEmail, forgotPassword, resetPassword, resendVerification } from "./auth.controller.js";
import { protect } from "../../shared/middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);
router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/resend-verification", resendVerification);

export default router;
