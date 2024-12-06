import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import Clock from "../assets/alarm-clock.svg";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) {
      // End test
      alert("Time's up! Submitting your quiz.");
      navigate("/portal"); // Adjust this to your portal route
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId); // Clear interval on component unmount
  }, [timeLeft, navigate]);

  //MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="flex gap-2 items-center text-sm font-semibold text-black px-5 py-4 bg-white rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
      <div>
        <img src={Clock} alt="clock" />
      </div>
      <div className="hidden lg:flex">Time Remaining:</div>
      <div>{formatTime(timeLeft)}</div>
      <div>min</div>
    </div>
  );
};

export default CountdownTimer;
