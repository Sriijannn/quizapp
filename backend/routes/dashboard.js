const express = require("express");
const Question = require("../models/questions");
const router = express.Router();

// Route to inject questions to the database.
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

// Route to send the questions, not yet secure.
router.post("/getquestions", async (req, res) => {
  const set = req.body.set;
  try {
    quesArray = await questions.findOne(set);
    res.status(201).json(quesArray);
  } catch (error) {
    console.error("Error finding the set", error);
    res.status(500).json({ error: "Error finding the set" });
  }
});

// Route for the basic info of the user. has to be secure? jwt verification?
router.get("/getinfo");

module.exports = router;

// route for the timer? nope

// Post request for submission of answers,
