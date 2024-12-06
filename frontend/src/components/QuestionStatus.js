import React from "react";

const QuestionStatus = ({
  questions,
  setCurrentQuestion,
  toggleQuestionStatus,
}) => {
  const statusColors = {
    answered: "bg-[#A9E0B1] text-[#1C922F]", // Green for answered
    notAnswered: "bg-[#CDDBFF] text-[#2F84C3]", // Blue for visited but not answered
    markedForLater: "bg-[#F9F4E7] text-[#BE9939]", // Yellow for marked for later
    notVisited: "bg-white text-[#0D0D0D] shadow-[0_4px_8px_rgba(0,0,0,0.25)]", // White for not visited
  };

  const section1 = questions.slice(0, 13); // First 13 questions
  const section2 = questions.slice(13, 25); // Next 12 questions
  const bonusSection = questions.slice(25, 30); // Last 5 questions for bonus

  const renderSection = (section, title) => (
    <div className="w-[100%] flex flex-col gap-8 mb-8">
      <h2 className="text-[#0D0D0D]">{title}</h2>
      <div className="flex flex-wrap gap-4">
        {section.map((question) => (
          <div
            key={question.number}
            onClick={() => {
              setCurrentQuestion(question);
              toggleQuestionStatus();
            }}
            className={`w-12 h-12 flex items-center justify-center rounded-full cursor-pointer ${
              statusColors[question.status]
            } text-sm font-semibold`}
          >
            {`Q${question.number}`}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {renderSection(section1, "SECTION 1")}
      {renderSection(section2, "SECTION 2")}
      {renderSection(bonusSection, "BONUS SECTION")}
    </div>
  );
};

export default QuestionStatus;
