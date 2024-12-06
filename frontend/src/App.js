// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Instructions from "./components/Instructions"; // The page after login
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes here, like the quiz dashboard */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
