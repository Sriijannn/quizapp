import React, { useState } from "react";
import CountdownModal from "./CountdownModal";
import { useSelector, useDispatch } from "react-redux";
import { submitAnswers } from "../components/submitHandler";
import { storeTransformedAnswers } from "../redux/actions/authActions"; // Correct import

const EndTestButton = ({ selectedAnswers }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Transform selected answers into the desired format
  const transformedAnswers = Array.isArray(selectedAnswers)
    ? selectedAnswers.reduce((acc, item) => {
        // Ensure item exists and has the necessary properties
        if (
          item &&
          item.questionNumber !== undefined &&
          item.selectedOption !== undefined
        ) {
          acc[item.questionNumber] =
            item.selectedOption === null ? 0 : item.selectedOption;
        } else {
          // Debugging log
        }
        return acc;
      }, {})
    : {};

  const handleEndTest = async () => {
    setIsModalOpen(true);
    console.log("Transformed Answers:", transformedAnswers);
    dispatch(storeTransformedAnswers(transformedAnswers)); // Debugging log
  };

  const handleConfirmEndTest = () => {
    setIsModalOpen(false); // Close the modal
    console.log("Test ended and answers confirmed.");
    // Additional actions can be added here if needed
  };

  const handleCancelEndTest = () => {
    setIsModalOpen(false); // Close the modal without ending the test
    console.log("Test ending cancelled.");
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
        onClose={handleCancelEndTest} // Close without ending the test
        onConfirm={handleConfirmEndTest} // Confirm end test
      />
    </div>
  );
};

export default EndTestButton;
