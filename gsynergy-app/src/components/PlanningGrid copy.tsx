import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import "ag-grid-enterprise/dist/styles/ag-grid-enterprise.css";
import { ClientSideRowModelModule } from "ag-grid-community";
import * as XLSX from "xlsx";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GridItem from "./GridItem/GridItem";

const PlanningScreen = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [gridApi, setGridApi] = useState<null | any>(null);

  // Product data with price and cost information
  const productData: { [key: string]: { price: number; cost: number } } = {
    "Rugged Utility Jacket": { price: 44.99, cost: 2.69 },
    "Floral Chiffon Wrap Dress": { price: 149.99, cost: 68.59 },
    "Lace-Up Combat Boots": { price: 24.99, cost: 24.83 },
    "Silk Embroidered Kimono": { price: 109.99, cost: 78.64 },
    "Textured Knit Pullover": { price: 54.99, cost: 50.45 },
    "Oversized Cat-Eye Sunglasses": { price: 179.99, cost: 122.68 },
    "Tassel Fringe Handbag": { price: 59.99, cost: 33.29 },
    "Faux Leather Leggings": { price: 189.99, cost: 12.77 },
    "Sporty Zip-Up Hoodie": { price: 185.5, cost: 65.49 },
    "Asymmetrical Hem Skirt": { price: 99.99, cost: 66.89 },
    "Sherpa Lined Denim Jacket": { price: 314.89, cost: 47.55 },
    "Diamond Stud Earrings": { price: 15.0, cost: 13.76 },
    "Waterproof Hiking Boots": { price: 145.5, cost: 17.33 }
  };

  // Function to calculate GM% background color
  const getGmPercentBackground = (value: number) => {
    if (value >= 40) return "#7CB342"; // Green
    if (value >= 10) return "#FDD835"; // Yellow
    if (value > 5) return "#FB8C00"; // Orange
    return "#EF5350"; // Red
  };

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch("/SampleData.xlsx"); // Adjust path if necessary
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        const storesSheet = workbook.Sheets["Stores"];
        const skusSheet = workbook.Sheets["SKUs"];
        const salesSheet = workbook.Sheets["SalesData"];

        if (!storesSheet || !skusSheet || !salesSheet) {
          console.error("Missing required sheets in Excel file.");
          return;
        }

        const stores: any[] = XLSX.utils.sheet_to_json(storesSheet);
        const skus: any[] = XLSX.utils.sheet_to_json(skusSheet);
        const salesData: any[] = XLSX.utils.sheet_to_json(salesSheet);

        const generatedData: any[] = [];

        // Cross join stores and SKUs
        stores.forEach((store) => {
          skus.forEach((sku) => {
            const row: any = {
              store: store.StoreName,
              sku: sku.SKUName
            };

            // Populate weekly sales data
            ["Feb_Week01", "Feb_Week02"].forEach((week) => {
              const salesRecord = salesData.find(
                (record) =>
                  record.StoreName === store.StoreName &&
                  record.SKUName === sku.SKUName &&
                  record.Week === week
              );
              row[`${week}_Units`] = salesRecord ? salesRecord.UnitsSold : 0;
            });

            generatedData.push(row);
          });
        });

        setRowData(generatedData);
      } catch (error) {
        console.error("Error fetching Excel data:", error);
      }
    };

    fetchExcelData();
  }, []);

  // Function to create weekly columns
  interface WeekColumnParams {
    data: {
      [key: string]: any;
      sku: string;
    };
    value?: number;
    newValue?: string;
  }

  const createWeekColumns = (weekNum: string, month: string) => {
    const prefix = `${month}_Week${weekNum.padStart(2, "0")}`;

    return [
      {
        headerName: `Sales Units`,
        field: `${prefix}_Units`,
        editable: true,
        type: "numericColumn",
        width: 120,
        valueParser: (params: WeekColumnParams): number =>
          Number(params.newValue),
        cellStyle: { textAlign: "right" }
      },
      {
        headerName: `Sales Dollars`,
        valueGetter: (params: WeekColumnParams): number => {
          const units = params.data[`${prefix}_Units`] || 0;
          const price = productData[params.data.sku]?.price || 0;
          return units * price;
        },
        width: 140,
        editable: false,
        valueFormatter: (params: WeekColumnParams): string =>
          params.value ? `$ ${params.value.toFixed(2)}` : "$ 0.00"
      },
      {
        headerName: `GM Dollars`,
        valueGetter: (params: WeekColumnParams): number => {
          const units = params.data[`${prefix}_Units`] || 0;
          const price = productData[params.data.sku]?.price || 0;
          const cost = productData[params.data.sku]?.cost || 0;
          return units * price - units * cost;
        },
        width: 140,
        editable: false,
        valueFormatter: (params: WeekColumnParams): string =>
          params.value ? `$ ${params.value.toFixed(2)}` : "$ 0.00"
      },
      {
        headerName: `GM Percent`,
        valueGetter: (params: WeekColumnParams): number => {
          const units = params.data[`${prefix}_Units`] || 0;
          const price = productData[params.data.sku]?.price || 0;
          const cost = productData[params.data.sku]?.cost || 0;
          const salesDollars = units * price;
          const gmDollars = salesDollars - units * cost;
          return salesDollars === 0 ? 0 : (gmDollars / salesDollars) * 100;
        },
        width: 130,
        editable: false,
        valueFormatter: (params: WeekColumnParams): string =>
          `${params.value?.toFixed(2)} %`,
        cellStyle: (params: WeekColumnParams): React.CSSProperties => ({
          textAlign: "right",
          backgroundColor: getGmPercentBackground(params.value || 0),
          color: (params.value || 0) >= 10 ? "white" : "black"
        })
      }
    ];
  };

  const columnDefs = [
    { headerName: "Store", field: "store", width: 220, pinned: "left" },
    { headerName: "SKU", field: "sku", width: 200, pinned: "left" },
    {
      headerName: "Feb",
      children: [
        { headerName: "Week 01", children: createWeekColumns("01", "Feb") },
        { headerName: "Week 02", children: createWeekColumns("02", "Feb") }
      ]
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div
        className="ag-theme-alpine"
        style={{ height: "100vh", width: "100%" }}
      >
        <GridItem
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true, resizable: true, filter: true }}
          onGridReady={(params: { api: any }) => setGridApi(params.api)}
        />
      </div>
    </Box>
  );
};

export default PlanningScreen;
