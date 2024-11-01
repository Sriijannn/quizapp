import React from "react";

const StatusIndicator = ({ status }) => {
  const statusInfo = {
    answered: { color: "bg-[#A9E0B1]",text: "text-[#1C922F]",bg: "bg-[#1C922F]", label: "Submitted" },
    notAnswered: { color: "bg-[#CDDBFF]",text: "text-[#2F84C3]",bg: "bg-[#2F84C3]", label: "Not Attempted" },
    markedForLater: { color: "bg-[#F9F4E7]",text: "text-[#BE9939]",bg: "bg-[#BE9939]", label: "Marked for Later" },
    notVisited: { color: "bg-[#F0F0F0]", text: "text-[#A0A0A0]", bg: "bg-[#A0A0A0]", label: "Not Visited" }
  };

// Destructure the status info for the given status, or use a default fallback if undefined
  const { color, text, bg, label } = statusInfo[status] || {
    color: "bg-gray-200",
    text: "text-gray-500",
    bg: "bg-gray-500",
    label: "Unknown"
  };

  return (
    <div className={`flex items-center space-x-2 px-2 py-1 rounded-full ${color}`}>
      <div className={`h-2 w-2 rounded-full ${bg}`} />
      <span className={`${text} text-sm font-medium`}>{label}</span>
    </div>
  );
};

export default StatusIndicator;
