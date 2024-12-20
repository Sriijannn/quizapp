import React, { useState } from "react";
import CountdownModal from "./CountdownModal";

import { useSelector } from "react-redux";
import { submitAnswers } from "../components/submitHandler";

const EndTestButton = ({ selectedAnswers }) => {
  const user = useSelector((state) => state.auth.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const transformedAnswers = selectedAnswers.reduce(
    (acc, { questionNumber, selectedOption }) => {
      acc[questionNumber] = selectedOption === null ? 0 : selectedOption;
      return acc;
    },
    {}
  );

  const handleEndTest = async () => {
    setIsModalOpen(true);
    try {
      // Call the submitAnswers function with selected answers and setId
      await submitAnswers(user, transformedAnswers);
    } catch (error) {
      console.error("Error during submission:", error);
    }

    console.log(transformedAnswers); // Open the modal when "End Test" is clicked
  };

  const handleConfirmEndTest = async () => {
    setIsModalOpen(false); // Close the modal
    // Access selectedAnswers here
    // navigate("/portal");
  };

  const handleCancelEndTest = () => {
    setIsModalOpen(false); // Close the modal without ending the test
  };

  return (
    <div className="flex flex-col items-center">
      {/* End Test Button */}
      <button
        onClick={handleEndTest}
        className="px-5 py-[18px] text-sm text-white bg-[#2F84C3] rounded-lg hover:bg-red-600 transition duration-200 shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
      >
        End Test
      </button>

      {/* Countdown Modal */}
      <CountdownModal
        isOpen={isModalOpen}
        onClose={handleCancelEndTest} // Close without ending test
        onConfirm={handleConfirmEndTest} // Confirm end test
      />
    </div>
  );
};

export default EndTestButton;
