const mongoose = require("mongoose");

const questionSetSchema = new mongoose.Schema({
  setId: {
    type: String,
    required: true,
    unique: true,
  },
  questions: [
    {
      quesId: {
        type: Number,
        required: true,
        unique: true,
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

const QuestionSet = mongoose.model("QuestionSet", questionSetSchema);

module.exports = QuestionSet;
