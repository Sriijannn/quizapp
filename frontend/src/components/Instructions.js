import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardHead from "./DashboardHead";

function Instructions() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleContinue = () => {
    navigate("/dashboard");
  };
  return (
    <div className="lg:overflow-hidden w-full h-screen flex flex-col justify-start items-center bg-[#F0F3F7] relative">
      <DashboardHead />
      <div class="relative h-full w-full">
        <button
          class="absolute bottom-4 right-4 flex gap-2 text-sm px-4 py-2 rounded-lg bg-[#2F84C3] text-white"
          onClick={handleContinue}
        >
          <p>Start the Quiz</p>
        </button>
      </div>
    </div>
  );
}

export default Instructions;
