const express = require("express");
const Question = require("../models/questions");
const router = express.Router();

router.post("/feedques", async (req, res) => {
  const questions = req.body.questions;

  try {
    const savedQuestions = await Question.insertMany(questions);
    res.status(201).json({ message: "Questions injected successfully" });
  } catch (error) {
    console.error("Error saving questions:", error);
    res.status(500).json({ error: "Error saving questions" });
  }
});

module.exports = router;
