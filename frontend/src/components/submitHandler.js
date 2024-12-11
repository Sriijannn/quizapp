import axios from "axios";

export const submitAnswers = async (selectedAnswers, setId) => {
  try {
    const payload = {
      setId,
      answers: selectedAnswers,
    };

    const response = await axios.post(
      "http://localhost:7009/dashboard/api/submitAnswers",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Submit Response:", response.data);
    alert("Answers submitted successfully!");
  } catch (error) {
    console.error(
      "Error submitting answers:",
      error.response?.data || error.message
    );
    alert("Failed to submit answers. Please try again.");
  }
};
