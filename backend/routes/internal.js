const express = require("express");
const router = express.Router();
const User = require("../models/user");
router.post("/update-time", async (req, res) => {
  const { username, timeLeft } = req.body;

  if (!username || timeLeft === undefined) {
    return res.status(400).send("Invalid data");
  }

  try {
    const result = await User.findOneAndUpdate({ username }, { timeLeft });

    if (!result) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("Time updated successfully");
  } catch (error) {
    console.error("Error updating time:", error);
    res.status(500).send("Internal server error");
  }
});

router.get("/get-time/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ timeLeft: user.timeLeft });
  } catch (error) {
    console.error("Error fetching timeLeft:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
