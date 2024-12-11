const express = require("express");
const QuestionSet = require("../models/questions");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Answer = require("../models/answers");

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

router.post("/saveAnswers", verifyToken, async (req, res) => {
  const { answers } = req.body;

  if (!answers || typeof answers !== "object") {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    const userId = req.user.username; // Extracted from JWT token

    // Check if the user already has answers stored
    let answerRecord = await Answer.findOne({ userId });

    if (answerRecord) {
      // Update the answers if the user already has an entry
      answerRecord.answers = answers;
      await answerRecord.save();
    } else {
      // Create a new answer record if none exists
      answerRecord = new Answer({ userId, answers });
      await answerRecord.save();
    }

    return res
      .status(200)
      .json({ message: "Answers saved successfully", data: answerRecord });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route for the basic info of the user. has to be secure? jwt verification?
router.get("/getinfo");

module.exports = router;

// route for the timer? nope

// Post request for submission of answers,
