import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import CountdownModal from "./CountdownModal"; // Import the new modal component

const EndTestButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleEndTest = () => {
    setIsModalOpen(true); // Open the modal when "End Test" is clicked
  };

  const handleRedirect = () => {
    navigate("/portal"); // Route to portal
  };

  return (
    <div className="flex flex-col items-center">
      {/* End Test Button */}
      <button
        onClick={handleEndTest}
        className="px-5 py-4 text-sm text-white bg-[#2F84C3] rounded-lg hover:bg-red-600 transition duration-200"
      >
        End Test
      </button>

      {/* Countdown Modal */}
      <CountdownModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRedirect={handleRedirect}
      />
    </div>
  );
};

export default EndTestButton;
