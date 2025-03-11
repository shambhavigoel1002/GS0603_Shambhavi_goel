import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stores" element={<Dashboard />} />
          <Route path="/skus" element={<div>SKUs Page</div>} />
          <Route path="/planning" element={<div>Planning Page</div>} />
          <Route path="/charts" element={<div>Charts Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
