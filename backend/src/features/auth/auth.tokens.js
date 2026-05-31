import crypto from "crypto";
import jwt from "jsonwebtoken";

const AUTH_COOKIE_NAME = "token";
const AUTH_TOKEN_EXPIRES_IN = "30d";
const AUTH_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
const EMAIL_VERIFICATION_MAX_AGE = 24 * 60 * 60 * 1000;
const PASSWORD_RESET_MAX_AGE = 60 * 60 * 1000;

const createJwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: AUTH_TOKEN_EXPIRES_IN,
  });
};

const verifyJwt = (token) => jwt.verify(token, process.env.JWT_SECRET);

const createRawToken = () => crypto.randomBytes(32).toString("hex");

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

const createHashedTokenPair = () => {
  const token = createRawToken();

  return {
    token,
    hashedToken: hashToken(token),
  };
};

const setAuthCookie = (res, token) => {
  res.cookie(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: AUTH_COOKIE_MAX_AGE,
  });
};

const clearAuthCookie = (res) => {
  res.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export {
  EMAIL_VERIFICATION_MAX_AGE,
  AUTH_COOKIE_NAME,
  PASSWORD_RESET_MAX_AGE,
  clearAuthCookie,
  createHashedTokenPair,
  createJwt,
  hashToken,
  setAuthCookie,
  verifyJwt,
};
