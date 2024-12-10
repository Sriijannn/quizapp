import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo-white.svg";
import Logout from "../assets/logout.svg";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function DashboardHead() {
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    navigate("/login");
  };

  const schoolName = useSelector((state) => state.auth.schoolName);
  const student = useSelector((state) => state.auth.student);
  const categoryCode = useSelector((state) => state.auth.category);
  var category = null;
  if (categoryCode == "0") {
    category = "6-7";
  } else {
    category = "8-9";
  }

  return (
    <div className="w-[100%] flex justify-between items-center px-6 py-4 bg-[#2F84C3]">
      <div className="flex justify-center items-center">
        <img src={Logo} alt="logo" className="w-28" />
      </div>
      <div className="flex gap-8">
        <div className="lg:flex gap-8 items-center hidden">
          <div className="flex gap-2 items-center">
            <p className="text-white text-sm font-semibold">Name:</p>
            <p className="text-white text-sm">{student}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-white text-sm font-semibold">School:</p>
            <p className="text-white text-sm">{schoolName}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-white text-sm font-semibold">Category:</p>
            <p className="text-white text-sm">{category}</p>
          </div>
        </div>
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={handleLogout}
        >
          <img src={Logout} alt="logout" />
          <p className="text-white text-sm">Log Out</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHead;
