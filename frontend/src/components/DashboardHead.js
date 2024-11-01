import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Logo from "../assets/logo-white.svg";
import Logout from "../assets/logout.svg";

function DashboardHead() {
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle logout and redirect to login
  const handleLogout = () => {
    navigate("/login"); // Redirects to the login page
  };

  return (
    <div className="w-[100%] flex justify-between items-center px-6 py-4 bg-[#2F84C3]">
      <div className="flex justify-center items-center">
        <img src={Logo} alt="logo" className="w-28" />
      </div>
      <div className="flex gap-8">
        <div className="lg:flex gap-8 items-center hidden">
          <div className="flex gap-2 items-center">
            <p className="text-white text-sm font-semibold">Name:</p>
            <p className="text-white text-sm">Arun Kumar Kushwaha</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-white text-sm font-semibold">School:</p>
            <p className="text-white text-sm">Army Public School, Kota</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-white text-sm font-semibold">Category:</p>
            <p className="text-white text-sm">8-9</p>
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
