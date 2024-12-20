const mongoose = require("mongoose");

const questionSetSchema = new mongoose.Schema({
  setId: {
    type: String,
    required: true,
    unique: true, // This ensures each set has a unique ID
  },
  questions: [
    {
      quesId: {
        type: Number,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        required: true,
      },
    },
  ],
});

questionSetSchema.index({ setId: 1, "questions.quesId": 1 }, { unique: true });

const QuestionSet = mongoose.model("QuestionSet", questionSetSchema);

module.exports = QuestionSet;
