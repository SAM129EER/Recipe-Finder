import asyncHandler from "../../shared/utils/asyncHandler.js";
import { serializeUser } from "../users/user.serializer.js";
import authMessages from "./auth.messages.js";
import authService from "./auth.service.js";
import { clearAuthCookie, setAuthCookie } from "./auth.tokens.js";

const registerUser = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  res.status(201).json({
    ...result.user,
    isVerified: result.isVerified,
    emailSent: result.emailSent,
    message: result.message,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  setAuthCookie(res, result.token);

  res.json({
    ...result.user,
    message: result.message,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  clearAuthCookie(res);
  res.json({ message: authMessages.loggedOut });
});

const getMe = asyncHandler(async (req, res) => {
  res.json(serializeUser(req.user));
});

const verifyEmail = asyncHandler(async (req, res) => {
  const token = req.params.token;
  const result = await authService.verifyEmail(token);
  res.json(result);
});

const forgotPassword = asyncHandler(async (req, res) => {
  const result = await authService.forgotPassword(req.body.email);
  res.json(result);
});

const resetPassword = asyncHandler(async (req, res) => {
  const result = await authService.resetPassword({
    token: req.params.token,
    password: req.body.password,
  });

  res.json(result);
});

const resendVerification = asyncHandler(async (req, res) => {
  const result = await authService.resendVerification(req.body.email);
  res.json(result);
});

export {
  forgotPassword,
  getMe,
  loginUser,
  logoutUser,
  registerUser,
  resendVerification,
  resetPassword,
  verifyEmail,
};
