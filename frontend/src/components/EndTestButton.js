import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountdownModal from "./CountdownModal";

const EndTestButton = ({ selectedAnswers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleEndTest = () => {
    setIsModalOpen(true);
    const transformedAnswers = selectedAnswers.reduce(
      (acc, { questionNumber, selectedOption }) => {
        acc[questionNumber] = selectedOption;
        return acc;
      },
      {}
    );

    console.log(transformedAnswers); // Open the modal when "End Test" is clicked
  };

  const handleConfirmEndTest = () => {
    setIsModalOpen(false); // Close the modal
    // Access selectedAnswers here
    // navigate("/portal"); // Redirect to portal after confirmation
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
