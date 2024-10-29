import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";

const CountdownModal = ({ isOpen, onClose, onRedirect }) => {
  const [countdown, setCountdown] = useState(15); // 15-second countdown

  // Countdown logic
  useEffect(() => {
    if (isOpen && countdown > 0) {
      const timerId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      if (countdown === 1) {
        onRedirect(); // Redirect when countdown reaches 0
      }

      return () => clearInterval(timerId); // Clear interval on unmount
    }
  }, [isOpen, countdown, onRedirect]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col justify-start gap-4 bg-white p-6 rounded-lg shadow-lg w-80 text-left">
        <img src={Logo} alt="logo" className="w-28" />
        <div className="text-md font-semibold text-[#1C922F]">
          Quiz Submitted. Thank you for taking the quiz!
        </div>
        <div className="text-sm text-gray-700">
          Redirecting in {countdown} seconds...
        </div>
        <button
          onClick={onRedirect}
          className="px-5 py-2 text-sm text-white bg-[#2F84C3] rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Click to Continue
        </button>
      </div>
    </div>
  );
};

export default CountdownModal;
