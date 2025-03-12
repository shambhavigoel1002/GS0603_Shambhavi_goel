// import React, { useEffect, useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import * as XLSX from "xlsx";

// // Register required Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface ChartData {
//   Week: string;
//   GM_Dollars: number;
//   Sales_Dollars: number;
//   GM_Percent: number;
// }

// interface GrossMarginChartProps {
//   file: string; // URL of the Excel file
// }

// const GrossMarginChart: React.FC<GrossMarginChartProps> = ({ file }) => {
//   const [chartData, setChartData] = useState<ChartData[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch("/assets/SampleData.xlsx");
//       const arrayBuffer = await response.arrayBuffer();
//       const workbook = XLSX.read(arrayBuffer, { type: "array" });
//       const sheetName = "Calculations";
//       const sheet = workbook.Sheets[sheetName];
//       const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

//       // Filter data for "San Francisco Bay Trends" (Store ID: ST035)
//       const storeData = jsonData.filter((row) => row.Store === "ST035");

//       // Aggregate GM Dollars and Sales Dollars per week
//       const aggregatedData: { [key: string]: ChartData } = {};
//       storeData.forEach((row) => {
//         const week = row.Week;
//         if (!aggregatedData[week]) {
//           aggregatedData[week] = {
//             Week: week,
//             GM_Dollars: 0,
//             Sales_Dollars: 0,
//             GM_Percent: 0
//           };
//         }
//         aggregatedData[week].GM_Dollars += row["GM Dollars"];
//         aggregatedData[week].Sales_Dollars += row["Sales Dollars"];
//       });

//       // Compute GM % and sort by week
//       const finalData = Object.values(aggregatedData)
//         .map((item) => ({
//           ...item,
//           GM_Percent:
//             item.Sales_Dollars > 0
//               ? (item.GM_Dollars / item.Sales_Dollars) * 100
//               : 0
//         }))
//         .sort((a, b) => a.Week.localeCompare(b.Week));

//       setChartData(finalData);
//     };

//     fetchData();
//   }, [file]);

//   // Chart.js configuration
//   const data = {
//     labels: chartData.map((item) => item.Week),
//     datasets: [
//       {
//         type: "bar" as const,
//         label: "GM Dollars",
//         data: chartData.map((item) => item.GM_Dollars),
//         backgroundColor: "rgba(54, 162, 235, 0.6)"
//       },
//       {
//         type: "line" as const,
//         label: "GM %",
//         data: chartData.map((item) => item.GM_Percent),
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 2,
//         fill: false,
//         yAxisID: "percentage"
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     scales: {
//       y: {
//         type: "linear" as const,
//         position: "left" as const,
//         title: { display: true, text: "GM Dollars" }
//       },
//       percentage: {
//         type: "linear" as const,
//         position: "right" as const,
//         title: { display: true, text: "GM %" },
//         ticks: { callback: (value: number) => `${value}%` }
//       }
//     }
//   };

//   return <Bar data={data} options={options} />;
// };

// export default GrossMarginChart;
import React from "react";

function ChartGrid() {
  return <div></div>;
}

export default ChartGrid;
