// src/components/Login.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      setSuccessMessage("Login Successful! Redirecting...");
      setTimeout(() => {
        navigate("/instructions");
      }, 1000);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        alert("Please stay on the dashboard during the test.");
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
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault(); // Prevents the default behavior for the Escape key
        console.log("Escape key is blocked");
      }
    });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-[16px] shadow-[0px_4px_8px_rgba(0,0,0,0.25)] w-[90%] md:w-[40%] lg:w-[27%]">
        <img src={logo} alt="Logo" className="w-4/12 mb-6" />

        <h2 className="text-1xl font-bold mb-1">Welcome User</h2>
        <p className="text-gray-400 mb-6 text-sm">
          Log into our quiz portal with the provided credentials
        </p>

        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Success! </strong>
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

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
              className="mt-1 mb-6 block w-full px-[20px] py-3 border border-gray-300 text-sm rounded-md"
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
