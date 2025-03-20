// src/components/GrossMarginChart.tsx

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  Bar,
  LineChart,
  Line,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  Week: string;
  GM_Dollars: number;
  GM_Percent: number;
}

const GrossMarginChart = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadExcelData();
  }, []);

  const loadExcelData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/assets/SampleData.xlsx");
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[5]]; // Assuming Sheet 6
      const jsonData = XLSX.utils.sheet_to_json<any>(sheet);

      const processedData = jsonData.map((row: any) => ({
        Week: row.Week || `W${row.Week}`, // Assuming 'Week' column
        GM_Dollars: Number(row["GM Dollars"]), // Assuming 'GM Dollars' column
        GM_Percent: Number(row["GM %"]), // Assuming 'GM %' column
      }));

      setChartData(processedData);
    } catch (error) {
      console.error("Error loading Excel file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", height: 500 }}>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Week" />
            <YAxis yAxisId="left" orientation="left" stroke="#2f8a9c" />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="rgba(0, 0, 0, 0.54)"
            />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="GM_Dollars" fill="#2f8a9c" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="GM_Percent"
              stroke="#ff7300"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default GrossMarginChart;
