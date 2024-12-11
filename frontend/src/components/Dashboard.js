import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardHead from "./DashboardHead";
import StatusIndicator from "./StatusIndicator";
import EndTestButton from "./EndTestButton";
import CountdownTimer from "./CountdownTimer";
import QuestionStatus from "./QuestionStatus";
import Next from "../assets/next.svg";
import CloseIcon from "../assets/close.svg";
import { useSelector } from "react-redux";

function Dashboard() {
  const setId = useSelector((state) => state.auth.setid);

  const [questions, setQuestions] = useState([]); // Store fetched questions
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestionStatus, setShowQuestionStatus] = useState(false);

  // Fetch questions only once when the component is mounted
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post(
          "http://localhost:7009/dashboard/api/fetchQuestions",
          { setId },
          { headers: { "Content-Type": "application/json" } }
        );
        setQuestions(
          response.data.questions.map((question, index) => ({
            number: index + 1,
            text: question.question,
            options: question.options,
            status: "unanswered",
          }))
        );
      } catch (error) {
        console.error(
          "Error fetching questions:",
          error.response?.data || error.message
        );
      }
    };

    if (setId) {
      fetchQuestions();
    }
  }, [setId]); // Dependency array ensures this effect runs only when `setId` changes

  // Fullscreen and event listeners setup
  useEffect(() => {
    const requestFullscreen = () => {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    };
    requestFullscreen();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        alert("Please stay on the dashboard during the test.");
        requestFullscreen();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

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

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion && currentQuestion.status === "unanswered") {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q, i) =>
          i === currentQuestionIndex ? { ...q, status: "notAnswered" } : q
        )
      );
    }
  }, [currentQuestionIndex, currentQuestion]);

  const handleOptionSelect = (option) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = {
        questionNumber: currentQuestion.number,
        selectedOption: option,
      };
      return updatedAnswers;
    });

    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === currentQuestionIndex ? { ...q, status: "answered" } : q
      )
    );
  };

  const toggleQuestionStatus = () => {
    setShowQuestionStatus(!showQuestionStatus);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const markQuestion = (questionNumber) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.number === questionNumber
          ? { ...question, status: "markedForLater" }
          : question
      )
    );
  };

  const clearOption = () => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = null; // Clear the answer for the current question
      return updatedAnswers;
    });

    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === currentQuestionIndex ? { ...q, status: "unanswered" } : q
      )
    );
  };

  return (
    <div className="lg:overflow-hidden w-full h-screen flex flex-col justify-start items-center bg-[#F0F3F7] relative">
      <DashboardHead />
      <div className="h-[100%] flex w-full">
        {/* Sidebar for Question Status */}
        <div
          className={`fixed lg:relative z-20 transition-transform duration-300 ${
            showQuestionStatus ? "translate-x-0" : "-translate-x-full"
          } h-screen bg-white lg:translate-x-0 w-[370px] px-6 py-8 overflow-y-auto`}
        >
          <div className="flex lg:hidden justify-end mb-4">
            <button onClick={toggleQuestionStatus} aria-label="Close sidebar">
              <img src={CloseIcon} alt="Close sidebar" className="w-6 h-6" />
            </button>
          </div>
          <QuestionStatus
            questions={questions}
            setCurrentQuestion={(question) =>
              setCurrentQuestionIndex(questions.indexOf(question))
            }
            toggleQuestionStatus={toggleQuestionStatus}
          />
        </div>

        {/* Main Content */}
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
                <StatusIndicator status={currentQuestion?.status} />
              </div>
              <div className="flex flex-wrap gap-3 items-center justify-end">
                <EndTestButton selectedAnswers={selectedAnswers} />
                <CountdownTimer />
                <div className="sm:hidden">
                  <StatusIndicator status={currentQuestion?.status} />
                </div>
              </div>
            </div>
          </div>

          <div className="h-[100%] w-[100%] flex flex-col justify-between">
            <div className="flex flex-col gap-8 py-4 px-3">
              {currentQuestion ? (
                <>
                  <div className="flex flex-col">
                    <div className="font-semibold">{`Q ${currentQuestion.number}.`}</div>
                    <div className="text-sm">{currentQuestion.text}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Options:</div>
                    <div className="flex flex-col gap-2 text-sm">
                      {currentQuestion.options.map((option, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            name="options"
                            value={option}
                            onChange={() => handleOptionSelect(option)}
                            checked={
                              selectedAnswers[currentQuestionIndex]
                                ?.selectedOption === option
                            }
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div>Loading...</div>
              )}
            </div>

            <div className="w-[100%] flex justify-between px-3 lg:mb-20 mb-5">
              <button
                onClick={() => markQuestion(currentQuestion?.number)}
                className="flex gap-2 text-sm px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                <p>Mark For Later</p>
              </button>
              <button
                onClick={clearOption}
                className="flex gap-2 text-sm px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Clear Option
              </button>
              <button
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className={`flex gap-2 text-sm px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400`}
              >
                <img src={Next} alt="next" />
                <p>Save And Next</p>
              </button>
            </div>
          </div>
        </div>
      </div>

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
