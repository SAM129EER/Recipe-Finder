import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const tokenGenerate = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
    });
    if (user) {
      const token = tokenGenerate(user._id);
      setTokenCookie(res, token);

      res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
        message: "User registered successfully",
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// loginUser controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = tokenGenerate(user._id);
      setTokenCookie(res, token);

      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        message: "User logged in successfully",
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    } 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// logoutUser controller
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getMe controller
const getMe = async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { registerUser, loginUser, logoutUser, getMe };