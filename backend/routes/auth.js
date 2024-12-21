// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Register User protected using admin_key
router.post("/register", async (req, res) => {
  const { adminkey, users } = req.body;

  if (!adminkey) {
    return res
      .status(403)
      .json({ message: "Access denied: Admin key is required" });
  }

  if (adminkey !== process.env.ADMIN) {
    return res.status(403).json({ message: "Access denied" });
  }

  if (!Array.isArray(users) || users.length === 0) {
    return res.status(400).json({ message: "Users array is required" });
  }

  const results = [];
  try {
    for (const user of users) {
      const { username, password, setid, schoolName, student, category } = user;

      if (!username || !password) {
        results.push({ username, status: "failed", reason: "Missing fields" });
        continue;
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        results.push({
          username,
          status: "failed",
          reason: "User already exists",
        });
        continue;
      }

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
      results.push({ username, status: "success" });
    }

    res.status(201).json({ message: "Batch processing complete", results });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    if (user.timeLeft == 0)
      return res.status(400).json({ message: "Time Limit Expired" });
    if (user.submitted == 1)
      return res.status(400).json({ message: "Already Submitted" });

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
