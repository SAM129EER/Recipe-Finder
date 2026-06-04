import bcrypt from "bcryptjs";

import AppError from "../../shared/errors/AppError.js";
import User from "../users/user.model.js";
import { serializeUser } from "../users/user.serializer.js";
import { sendPasswordResetEmail, sendVerificationEmail } from "./auth.email.js";
import authMessages from "./auth.messages.js";
import {
  EMAIL_VERIFICATION_MAX_AGE,
  PASSWORD_RESET_MAX_AGE,
  createHashedTokenPair,
  createJwt,
  hashToken,
} from "./auth.tokens.js";

const createVerificationTokenForUser = async (user) => {
  const { token, hashedToken } = createHashedTokenPair();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpires = Date.now() + EMAIL_VERIFICATION_MAX_AGE;
  await user.save();

  return token;
};

const register = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new AppError(authMessages.missingFields, 400);
  }

  const userExists = await User.exists({ email });

  if (userExists) {
    throw new AppError(authMessages.userExists, 400);
  }

  const { token: verificationToken, hashedToken } = createHashedTokenPair();
  const user = await User.create({
    username,
    email,
    password,
    isVerified: false,
    emailVerificationToken: hashedToken,
    emailVerificationExpires: Date.now() + EMAIL_VERIFICATION_MAX_AGE,
  });

  let emailSent = true;

  try {
    await sendVerificationEmail(user.email, verificationToken);
  } catch (emailError) {
    console.error("Failed to send verification email:", emailError);
    emailSent = false;
  }

  return {
    user: serializeUser(user),
    isVerified: false,
    emailSent,
    message: emailSent
      ? authMessages.registrationSuccess
      : authMessages.registrationEmailFailed,
  };
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError(authMessages.missingFields, 400);
  }

  const user = await User.findOne({ email });
  const isPasswordValid =
    user && (await bcrypt.compare(password, user.password));

  if (!isPasswordValid) {
    throw new AppError(authMessages.invalidCredentials, 401);
  }

  if (!user.isVerified) {
    throw new AppError(authMessages.verifyBeforeLogin, 403, {
      isVerified: false,
      email: user.email,
    });
  }

  return {
    token: createJwt(user._id),
    user: serializeUser(user),
    message: authMessages.loggedIn,
  };
};

const verifyEmail = async (token) => {
  const user = await User.findOne({
    emailVerificationToken: hashToken(token),
    emailVerificationExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError(authMessages.invalidVerificationToken, 400);
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  return { message: authMessages.verificationSuccess };
};

const forgotPassword = async (email) => {
  if (!email) {
    throw new AppError(authMessages.missingEmail, 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    return { message: authMessages.passwordResetSent };
  }

  const { token: resetToken, hashedToken } = createHashedTokenPair();

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + PASSWORD_RESET_MAX_AGE;
  await user.save();

  try {
    await sendPasswordResetEmail(user.email, resetToken);
  } catch (emailError) {
    console.error("Failed to send reset email:", emailError);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    throw new AppError(authMessages.passwordResetEmailFailed, 500);
  }

  return { message: authMessages.passwordResetSent };
};

const resetPassword = async ({ token, password }) => {
  if (!password) {
    throw new AppError(authMessages.missingPassword, 400);
  }

  if (password.length < 6) {
    throw new AppError(authMessages.passwordMinLength, 400);
  }

  const user = await User.findOne({
    passwordResetToken: hashToken(token),
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError(authMessages.invalidResetToken, 400);
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return { message: authMessages.passwordResetSuccess };
};

const resendVerification = async (email) => {
  if (!email) {
    throw new AppError(authMessages.missingEmail, 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    return { message: authMessages.verificationSent };
  }

  if (user.isVerified) {
    throw new AppError(authMessages.emailAlreadyVerified, 400);
  }

  const verificationToken = await createVerificationTokenForUser(user);

  try {
    await sendVerificationEmail(user.email, verificationToken);
  } catch (emailError) {
    console.error("Failed to send verification email:", emailError);
    throw new AppError(authMessages.verificationEmailFailed, 500);
  }

  return { message: authMessages.verificationSent };
};

const authService = {
  forgotPassword,
  login,
  register,
  resendVerification,
  resetPassword,
  verifyEmail,
};

export default authService;
