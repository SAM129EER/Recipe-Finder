import AppError from "../errors/AppError.js";
import User from "../../features/users/user.model.js";
import { AUTH_COOKIE_NAME, verifyJwt } from "../../features/auth/auth.tokens.js";

export const protect = async (req, res, next) => {
  const token = req.cookies?.[AUTH_COOKIE_NAME];

  if (!token) {
    return next(new AppError("Not authorized, no token provided", 401));
  }

  try {
    const decoded = verifyJwt(token);
    console.log(decoded)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return next(new AppError("Not authorized, user not found", 401));
    }
     console.log(req.user)

    return next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return next(new AppError("Not authorized, token failed", 401));
  }
};
