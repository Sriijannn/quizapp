import React from "react";
import DashboardHead from "./DashboardHead";
import StatusIndicator from "./StatusIndicator";
import EndTestButton from "./EndTestButton";
import CountdownTimer from "./CountdownTimer";

function Dashboard() {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-[#F0F3F7]">
      <DashboardHead />
      <div className="w-[100%] flex">
        <div className="w-[100%] flex justify-between items-start py-4 px-3">
          <div className="flex md:hidden flex-col gap-1">
            <div className="bg-black w-7 h-1 rounded-full"></div>
            <div className="bg-black w-[14px] h-1 rounded-full"></div>
            <div className="bg-black w-7 h-1 rounded-full"></div>
          </div>
          <div className="w-[100%] flex flex-wrap items-center justify-end sm:justify-between">
            <div className="hidden sm:flex">
              <StatusIndicator status="notAttempted" />
            </div>
            <div className="flex flex-wrap gap-3 items-center justify-end">
              <EndTestButton />
              <CountdownTimer />
              <div className="sm:hidden">

              <StatusIndicator status="notAttempted"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
