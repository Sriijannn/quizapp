// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Register User protected using admin_key
router.post("/register", async (req, res) => {
  const { username, password, adminkey, setid, schoolName, student, category } =
    req.body;
  if (!adminkey) {
    return res
      .status(403)
      .json({ message: "Access denied: Admin key is required" });
  }
  if (adminkey !== process.env.ADMIN) {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      setid,
      schoolName,
      student,
      category,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "45m",
    });

    return res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
