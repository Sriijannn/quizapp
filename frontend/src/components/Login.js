// src/components/Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg"; // Assuming you're using react-router for navigation

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate(); // Used to navigate after login

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  // Redirect to the quiz page if already authenticated
  if (isAuthenticated) {
    navigate("/instructions"); // Or wherever you want to go post-login
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-[16px] shadow-[0px_4px_8px_rgba(0,0,0,0.25)] w-[90%] md:w-[40%] lg:w-[27%]">
        <img src={logo} alt="Logo" className="w-4/12 mb-6" />

        <h2 className="text-1xl font-bold mb-1">Welcome User</h2>
        <p className="text-gray-400 mb-6 text-sm">
          Log into our quiz portal with the provided credentials
        </p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-[20px] py-3 border border-gray-300 text-sm rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1  mb-6 block w-full px-[20px] py-3 border border-gray-300 text-sm rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#2F84C3] text-white font-semibold py-3 rounded-md hover:bg-[rgba(47,131,195,0.869)]"
          >
            Login
          </button>
          <p className="text-gray-400 text-xs mt-6 text-center">
            In case of any technical difficulty mail us.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
