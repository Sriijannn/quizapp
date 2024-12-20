import axios from "axios";

export const submitAnswers = async (user, selectedAnswers) => {
  console.log("User:", user);
  console.log("Selected Answers Before Transformation:", selectedAnswers);

  // Transform answers object to ensure keys are strings
  const transformedAnswers = Object.fromEntries(
    Object.entries(selectedAnswers).map(([key, value]) => [String(key), value])
  );

  console.log("Transformed Answers:", transformedAnswers);

  try {
    const payload = {
      username: user,
      answers: transformedAnswers,
    };

    const response = await axios.post(
      "http://localhost:7009/dashboard/api/saveAnswers",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
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
