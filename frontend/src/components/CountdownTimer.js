import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Clock from "../assets/alarm-clock.svg";
import axios from "axios";
import { logoutUser } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { submitAnswers } from "./submitHandler";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const timeLeftRef = useRef(timeLeft);
  const username = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const transformedAnswers = useSelector(
    (state) => state.auth.transformedAnswers
  );

  // Keep ref updated with latest timeLeft value
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  // Fetch remaining time when component mounts
  useEffect(() => {
    if (!username) return;

    const fetchRemainingTime = async () => {
      try {
        const response = await fetch(`/internal/api/get-time/${username}`);
        if (response.ok) {
          const data = await response.json();
          setTimeLeft(data.timeLeft);
        } else {
        }
      } catch (error) {}
    };

    fetchRemainingTime();
  }, [username]);

  // Update time on server every minute
  useEffect(() => {
    if (!username) return;

    const updateTimeOnServer = async () => {
      const currentTimeLeft = timeLeftRef.current;
      if (currentTimeLeft === null || currentTimeLeft <= 0) return;

      try {
        await axios.post("/internal/api/update-time", {
          username,
          timeLeft: currentTimeLeft,
        });
      } catch (error) {}
    };

    // Initial update immediately
    updateTimeOnServer();

    // Start the interval for subsequent updates
    const updateTimerId = setInterval(updateTimeOnServer, 10000);

    // Cleanup interval on unmount
    return () => clearInterval(updateTimerId);
  }, [username]); // Removed timeLeft from dependencies

  // Timer logic to count down every second
  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      alert("Time's up! Submitting your quiz.");
      const confirmEnd = async () => {
        try {
          await submitAnswers(user, transformedAnswers); // Start countdown after submission
        } catch (error) {
          console.error("Error during submission:", error);
        }
      };
      confirmEnd();

      const updateTimeOnServer = async () => {
        try {
          await axios.post("/internal/api/update-time", {
            username,
            timeLeft: 0,
          });
        } catch (error) {}
      };
      updateTimeOnServer();

      dispatch(logoutUser());
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

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
