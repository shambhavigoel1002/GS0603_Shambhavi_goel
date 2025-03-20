// src/components/GMChart.tsx

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { sampleData, stores } from "./sampleData";
// import { sampleData, stores } from "../data/sampleData";

const GMChart: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<string>(stores[0]);
  const [data, setData] = useState(sampleData); // Replace with actual data fetching logic

  // Handle store selection
  const handleStoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const store = e.target.value;
    setSelectedStore(store);
    // You may want to fetch data for the selected store here
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      <div>
        <label htmlFor="store">Select Store: </label>
        <select id="store" value={selectedStore} onChange={handleStoreChange}>
          {stores.map((store) => (
            <option key={store} value={store}>
              {store}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis yAxisId="left" orientation="left" stroke="#2f8a9c" />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="rgba(0, 0, 0, 0.54)"
          />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="gmDollars" fill="#2f8a9c" />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="gmPercentage"
            stroke="rgba(0, 0, 0, 0.54)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GMChart;
