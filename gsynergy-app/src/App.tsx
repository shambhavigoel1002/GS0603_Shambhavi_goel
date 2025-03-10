import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard"; // Assuming you have a Dashboard component

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* Define your routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
