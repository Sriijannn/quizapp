const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    username: {
      type: String, // or ObjectId if it's a reference to another model
      required: true,
    },
    answers: {
      type: Map,
      of: String, // Store string values in the map
      required: true, // Make sure this field is required
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", AnswerSchema);
