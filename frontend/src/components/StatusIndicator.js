import React from "react";

const StatusIndicator = ({ status }) => {
  const statusInfo = {
    submitted: { color: "bg-[#A9E0B1]",text: "text-[#1C922F]",bg: "bg-[#1C922F]", label: "Submitted" },
    markedForLater: { color: "bg-[#F9F4E7]",text: "text-[#BE9939]",bg: "bg-[#BE9939]", label: "Marked for Later" },
    notAttempted: { color: "bg-[#CDDBFF]",text: "text-[#2F84C3]",bg: "bg-[#2F84C3]", label: "Not Attempted" },
  };

  const { color,text,bg, label } = statusInfo[status];

  return (
    <div className={`flex items-center space-x-2 px-2 py-1 rounded-full ${color}`}>
      <div className={`h-2 w-2 rounded-full ${bg}`} />
      <span className={`${text} text-sm font-medium`}>{label}</span>
    </div>
  );
};

export default StatusIndicator;
