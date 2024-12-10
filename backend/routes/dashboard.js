const express = require("express");
const QuestionSet = require("../models/questions");
const router = express.Router();

// Route to inject questions to the database.
router.post("/feedques", async (req, res) => {
  const { setId, questions } = req.body;
  try {
    let existingSet = await QuestionSet.findOne({ setId });

    if (existingSet) {
      existingSet.questions.push(...questions);
      await existingSet.save();
    } else {
      const newSet = new QuestionSet({ setId, questions });
      await newSet.save();
    }

    res.status(201).json({ message: "Questions injected successfully" });
  } catch (error) {
    console.error("Error saving questions:", error);
    res.status(500).json({ error: "Error saving questions" });
  }
});

// Route to send the questions, not yet secure.
router.post("/fetchQuestions", async (req, res) => {
  const { setId } = req.body;
  try {
    const questionSet = await QuestionSet.findOne({ setId });
    if (!questionSet) {
      return res.status(404).json({ message: "Question set not found" });
    }
    res.status(200).json(questionSet);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Error fetching questions" });
  }
});

// Route for the basic info of the user. has to be secure? jwt verification?
router.get("/getinfo");

module.exports = router;

// route for the timer? nope

// Post request for submission of answers,
