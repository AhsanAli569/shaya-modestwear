import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔹 REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields required" });
    }

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // Save new user
    const user = new User({ name, email, password: hashedPass });
    await user.save();

    res.json({ success: true, message: "User registered successfully" });

  } catch (err) {
    console.log("Register Error:", err);
    res.json({ success: false, message: "Signup failed" });
  }
};

// 🔹 LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    // Create JWT Token
    const token = jwt.sign({ id: user._id }, "MY_SECRET_KEY", {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.log("Login Error:", err);
    res.json({ success: false, message: "Login failed" });
  }
};
