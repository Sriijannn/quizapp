const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
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
  correctAnswer: {
    type: String,
    required: true,
  },
  setId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
