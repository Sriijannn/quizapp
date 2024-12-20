import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Clock from "../assets/alarm-clock.svg";
import axios from "axios";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(null); // Initial null to indicate loading state
  const navigate = useNavigate();

  // Fetch the username from Redux store
  const username = useSelector((state) => state.auth.user);

  // Fetch remaining time when the component mounts
  useEffect(() => {
    if (!username) return;

    const fetchRemainingTime = async () => {
      try {
        const response = await fetch(`/internal/api/get-time/${username}`);
        if (response.ok) {
          const data = await response.json();
          setTimeLeft(data.timeLeft); // Initialize the timeLeft state
        } else {
          console.error("Failed to fetch remaining time");
        }
      } catch (error) {
        console.error("Error fetching remaining time:", error);
      }
    };

    fetchRemainingTime();
  }, [username]);

  // Timer logic
  useEffect(() => {
    if (timeLeft === null) return; // Don't start until timeLeft is initialized

    if (timeLeft <= 0) {
      alert("Time's up! Submitting your quiz.");
      navigate("/portal");
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) return prevTime - 1;
        clearInterval(timerId);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, navigate]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  // Handle loading state
  if (timeLeft === null) {
    return <div>Loading...</div>;
  }

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
