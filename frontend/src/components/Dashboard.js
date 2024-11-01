import React, { useEffect, useState } from "react";
import DashboardHead from "./DashboardHead";
import StatusIndicator from "./StatusIndicator";
import EndTestButton from "./EndTestButton";
import CountdownTimer from "./CountdownTimer";
import QuestionStatus from "./QuestionStatus";
import Prev from "../assets/prev.svg";
import Next from "../assets/next.svg";
import CloseIcon from "../assets/close.svg"; // Assuming you have a close icon

function Dashboard() {
  useEffect(() => {
    // Request fullscreen mode when the dashboard mounts
    const requestFullscreen = () => {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    };
    requestFullscreen();

    // Warn user or attempt refocus if they navigate away
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        alert("Please stay on the dashboard during the test.");
        requestFullscreen();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    //disable right click
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    //disable keys
    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const [showQuestionStatus, setShowQuestionStatus] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      number: 1,
      status: "answered",
      text: "Question 1 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 2,
      status: "notAnswered",
      text: "Question 2 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 3,
      status: "markedForLater",
      text: "Question 3 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 4,
      status: "notVisited",
      text: "Question 4 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 5,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 6,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 7,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 8,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 9,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 10,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 11,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 12,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 13,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 14,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 15,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 16,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 17,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 18,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 19,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 20,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 21,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 22,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 23,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 24,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 25,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 26,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 27,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 28,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 29,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      number: 30,
      status: "answered",
      text: "Question 5 text",
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const toggleQuestionStatus = () => {
    setShowQuestionStatus(!showQuestionStatus);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="lg:overflow-hidden w-full h-screen flex flex-col justify-start items-center bg-[#F0F3F7] relative">
      <DashboardHead />
      <div className="h-[100%] flex w-full">
        {/* Sidebar Overlay for mobile */}
        <div
          className={`fixed lg:relative z-20 transition-transform duration-300 ${
            showQuestionStatus ? "translate-x-0" : "-translate-x-full"
          } h-screen bg-white lg:translate-x-0 w-[370px] px-6 py-8 overflow-y-auto`}
        >
          {/* Close Icon */}
          <div className="flex lg:hidden justify-end mb-4">
            <button onClick={toggleQuestionStatus} aria-label="Close sidebar">
              <img src={CloseIcon} alt="Close sidebar" className="w-6 h-6" />
            </button>
          </div>
          <QuestionStatus
            questions={questions}
            setCurrentQuestion={(question) => setCurrentQuestionIndex(questions.indexOf(question))}
            toggleQuestionStatus={toggleQuestionStatus}
          />
        </div>

        {/* Main Quiz Area */}
        <div className="h-[100%] flex-1 flex flex-col">
          <div className="w-full flex gap-4 justify-between items-start py-4 px-3">
            <div
              className="cursor-pointer flex lg:hidden flex-col gap-1"
              onClick={toggleQuestionStatus}
            >
              <div className="bg-black w-7 h-1 rounded-full"></div>
              <div className="bg-black w-[14px] h-1 rounded-full"></div>
              <div className="bg-black w-7 h-1 rounded-full"></div>
            </div>
            <div className="w-full flex items-center justify-end sm:justify-between">
              <div className="hidden sm:flex">
              <StatusIndicator status={currentQuestion.status} />
              </div>
              <div className="flex flex-wrap gap-3 items-center justify-end">
                <EndTestButton />
                <CountdownTimer />
                <div className="sm:hidden">
                <StatusIndicator status={currentQuestion.status} />
                </div>
              </div>
            </div>
          </div>

          <div className="h-[100%] w-[100%] flex flex-col justify-between">
            {/* Display the current question */}
            <div className="flex flex-col gap-8 py-4 px-3">
              <div className="flex flex-col">
                <div className="font-semibold">{`Q ${currentQuestion.number}.`}</div>
                <div className="text-sm">{currentQuestion.text}</div>
              </div>
              <div>
                <div className="font-semibold">Options:</div>
                <div className="flex flex-col gap-2 text-sm">
                  {currentQuestion.options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="options"
                        value={`option${index + 1}`}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="w-[100%] flex justify-between px-3 lg:mb-20 mb-5">
              <button
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`flex gap-2 text-sm px-4 py-2 rounded-lg ${
                  currentQuestionIndex === 0 ? "bg-gray-200" : "bg-gray-300"
                }`}
              >
                <img src={Prev} alt="prev" />
                <p>Previous</p>
              </button>
              <button
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className={`flex gap-2 text-sm px-4 py-2 rounded-lg ${
                  currentQuestionIndex === questions.length - 1
                    ? "bg-gray-200"
                    : "bg-gray-300"
                }`}
              >
                <img src={Next} alt="next" />
                <p>Next</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Background (when sidebar is open) */}
      {showQuestionStatus && (
        <div
          onClick={toggleQuestionStatus}
          className="fixed inset-0 bg-black opacity-30 lg:hidden"
        ></div>
      )}
    </div>
  );
}

export default Dashboard;
