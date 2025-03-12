import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import StoreGrid from "./components/StoreGrid";
import SkuGrid from "./components/SkuGrid";
import ChartGrid from "./components/ChartGrid";
import Layout from "./pages/Layout";
import PlanningGrid from "./components/PlanningGrid";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/stores"
            element={
              <Layout>
                <StoreGrid />
              </Layout>
            }
          />
          <Route
            path="/skus"
            element={
              <Layout>
                <SkuGrid />
              </Layout>
            }
          />
          <Route
            path="/planning"
            element={
              <Layout>
                <PlanningGrid />
              </Layout>
            }
          />
          <Route
            path="/charts"
            element={
              <Layout>
                <ChartGrid />
              </Layout>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
