import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import { useSelector } from "react-redux";
import { submitAnswers } from "../components/submitHandler"; // Import submitHandler
import { logoutUser } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";

const CountdownModal = ({ isOpen, onClose }) => {
  const transformedAnswers = useSelector(
    (state) => state.auth.transformedAnswers
  );
  const user = useSelector((state) => state.auth.user);
  const [countdown, setCountdown] = useState(15); // 15-second countdown
  const [isConfirmed, setIsConfirmed] = useState(false); // To track if user has confirmed ending the test
  const dispatch = useDispatch();
  // Reset countdown and confirmation when modal is opened
  useEffect(() => {
    if (isOpen) {
      setCountdown(15); // Reset countdown
      setIsConfirmed(false); // Reset confirmation status
    }
  }, [isOpen]);

  const onRedirect = () => {
    dispatch(logoutUser());
  };

  // Countdown logic, only runs if user has confirmed
  useEffect(() => {
    if (isConfirmed && countdown > 0) {
      const timerId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      // Clear interval on unmount or when countdown reaches 0
      return () => clearInterval(timerId);
    } else if (countdown === 0) {
      onRedirect(); // Redirect when countdown reaches 0
    }
  }, [isConfirmed, countdown, onRedirect]);

  const confirmEnd = async () => {
    try {
      await submitAnswers(user, transformedAnswers); // Call submit handler with transformed answers
      setIsConfirmed(true); // Start countdown after submission
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col justify-start gap-4 bg-white p-6 rounded-lg shadow-lg w-80 text-left">
        <img src={Logo} alt="logo" className="w-28" />

        {/* Conditional content based on confirmation */}
        {!isConfirmed ? (
          <>
            <div className="text-md font-semibold text-[#1C922F]">
              Are you sure you want to end the test?
            </div>
            <div className="flex gap-4 justify-stretch items-center">
              <button
                onClick={confirmEnd} // Start countdown and submit the test
                className="w-[50%] px-5 py-2 text-sm text-white bg-[#2F84C3] rounded-lg hover:bg-red-600 transition duration-200"
              >
                End Test
              </button>
              <button
                onClick={onClose} // Close modal and resume test
                className="w-[50%] px-5 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-md font-semibold text-[#1C922F]">
              Quiz Submitted. Thank you for taking the quiz!
            </div>
            <div className="text-sm text-gray-700">
              Redirecting in {countdown} seconds...
            </div>
            <button
              onClick={onRedirect} // Redirect immediately if user clicks
              className="px-5 py-2 text-sm text-white bg-[#2F84C3] rounded-lg hover:bg-blue-500 transition duration-200"
            >
              Click to Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CountdownModal;
