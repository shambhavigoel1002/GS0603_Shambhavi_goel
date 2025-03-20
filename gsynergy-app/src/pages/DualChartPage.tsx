// src/pages/DualChartPage.tsx

import React from "react";
import GrossMarginChart from "../components/Charts/GrossMarginChart";
import GMChart from "../components/Charts/GMChart";

const DualChartPage = () => {
  return (
    <div style={{ width: "100%" }}>
      <div>
        <h2>Chart 1: Gross Margin Data</h2>
        <GrossMarginChart />
      </div>
      <div>
        <h2>Chart 2: Store Data</h2>
        <GMChart />
      </div>
    </div>
  );
};

export default DualChartPage;
