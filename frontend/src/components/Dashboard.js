import React, { useState } from "react";
import DashboardHead from "./DashboardHead";
import StatusIndicator from "./StatusIndicator";
import EndTestButton from "./EndTestButton";
import CountdownTimer from "./CountdownTimer";
import QuestionStatus from "./QuestionStatus";

function Dashboard() {
  const [showQuestionStatus, setShowQuestionStatus] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    number: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    options: [
      "Lorem ipsum dolor sit amet",
      "Ut enim ad minim veniam",
      "Excepteur sint occaecat cupidatat",
      "Quis nostrud exercitation ullamco laboris",
    ],
    status: "notVisited",
  });

  const toggleQuestionStatus = () => {
    setShowQuestionStatus(!showQuestionStatus);
  };

  const questions = [
    { number: 1, status: "answered", text: "Question 1 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 2, status: "visited", text: "Question 2 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 3, status: "marked", text: "Question 3 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 4, status: "notVisited", text: "Question 4 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 5, status: "answered", text: "Question 5 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 1, status: "answered", text: "Question 1 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 2, status: "visited", text: "Question 2 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 3, status: "marked", text: "Question 3 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 4, status: "notVisited", text: "Question 4 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 5, status: "answered", text: "Question 5 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 1, status: "answered", text: "Question 1 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 2, status: "visited", text: "Question 2 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 3, status: "marked", text: "Question 3 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 4, status: "notVisited", text: "Question 4 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 5, status: "answered", text: "Question 5 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 1, status: "answered", text: "Question 1 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 2, status: "visited", text: "Question 2 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 3, status: "marked", text: "Question 3 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 4, status: "notVisited", text: "Question 4 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 5, status: "answered", text: "Question 5 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 1, status: "answered", text: "Question 1 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 2, status: "visited", text: "Question 2 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 3, status: "marked", text: "Question 3 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 4, status: "notVisited", text: "Question 4 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 5, status: "answered", text: "Question 5 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 1, status: "answered", text: "Question 1 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 2, status: "visited", text: "Question 2 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 3, status: "marked", text: "Question 3 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 4, status: "notVisited", text: "Question 4 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 5, status: "answered", text: "Question 5 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 1, status: "answered", text: "Question 1 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 2, status: "visited", text: "Question 2 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 3, status: "marked", text: "Question 3 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 4, status: "notVisited", text: "Question 4 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    { number: 5, status: "answered", text: "Question 5 text", options: ["Option A", "Option B", "Option C", "Option D"] },
    // Add remaining questions similarly...
  ];

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center bg-[#F0F3F7]">
      <DashboardHead />
      <div className="flex w-full">
        <div className={`lg:flex ${showQuestionStatus ? 'block' : 'hidden'} lg:block px-6 py-8 bg-white w-[360px]`}>
          <QuestionStatus questions={questions} setCurrentQuestion={setCurrentQuestion} />
        </div>
        
        {/* Main Quiz Area */}
        <div className="flex-1 flex flex-col">
          <div className="w-full flex gap-4 justify-between items-start py-4 px-3">
            <div className="cursor-pointer flex lg:hidden flex-col gap-1" onClick={toggleQuestionStatus}>
              <div className="bg-black w-7 h-1 rounded-full"></div>
              <div className="bg-black w-[14px] h-1 rounded-full"></div>
              <div className="bg-black w-7 h-1 rounded-full"></div>
            </div>
            <div className="w-full flex items-center justify-end sm:justify-between">
              <div className="hidden sm:flex">
                <StatusIndicator status="notAttempted" />
              </div>
              <div className="flex flex-wrap gap-3 items-center justify-end">
                <EndTestButton />
                <CountdownTimer />
                <div className="sm:hidden">
                  <StatusIndicator status="notAttempted" />
                </div>
              </div>
            </div>
          </div>

          {/* Display the current question */}
          <div className="flex flex-col gap-8 py-4 px-3">
            <div className="flex flex-col">
              <div className="font-semibold">{`Q ${currentQuestion.number}.`}</div>
              <div className="text-sm">
                {currentQuestion.text}
              </div>
            </div>
            <div>
              <div className="font-semibold">Options:</div>
              <div className="flex flex-col gap-2 text-sm">
                {currentQuestion.options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input type="radio" name="options" value={`option${index + 1}`} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
