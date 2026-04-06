import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const tokenGenerate = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
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
      res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
        token: tokenGenerate(user._id),
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
const loginUser = async (req,res)=>{
     try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
      const user = await User.findOne({
        email
      });
      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          id: user._id,
          username: user.username,
          email: user.email,
          token: tokenGenerate(user._id),
          message: "User logged in successfully",
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      } 
     } catch (error) {
      res.status(500).json({ message: error.message });
     }

}


export { registerUser, loginUser };