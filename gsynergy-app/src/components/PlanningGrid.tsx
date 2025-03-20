import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ClientSideRowModelModule } from "ag-grid-community";
import * as XLSX from "xlsx";
import { Box } from "@mui/material";

import GridItem from "./Commons/GridItem/GridItem";

interface RowData {
  store: string;
  sku: string;
  Feb_Week01_Units: number;
  Feb_Week02_Units: number;
  [key: string]: string | number; // Add index signature to allow dynamic access
}

const PlanningScreen = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [gridApi, setGridApi] = useState<any>(null);
  const [gridColumnApi, setGridColumnApi] = useState<any>(null);

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
    "Waterproof Hiking Boots": { price: 145.5, cost: 17.33 },
  };

  // Function to calculate background color based on GM percentage
  const getGmPercentBackground = (value: number) => {
    if (value >= 40) return "#7CB342"; // Green
    if (value >= 10) return "#FDD835"; // Yellow
    if (value > 5) return "#FB8C00"; // Orange
    return "#EF5350"; // Red
  };

  useEffect(() => {
    // Sample data that matches the screenshot
    const sampleData: RowData[] = [
      {
        store: "Nashville Melody Music Store",
        sku: "Rugged Utility Jacket",
        Feb_Week01_Units: 200,
        Feb_Week02_Units: 0,
      },
      {
        store: "Chicago Charm Boutique",
        sku: "Floral Chiffon Wrap Dress",
        Feb_Week01_Units: 200,
        Feb_Week02_Units: 0,
      },
      {
        store: "Miami Breeze Apparel",
        sku: "Lace-Up Combat Boots",
        Feb_Week01_Units: 199,
        Feb_Week02_Units: 14,
      },
      {
        store: "Nashville Melody Music Store",
        sku: "Silk Embroidered Kimono",
        Feb_Week01_Units: 198,
        Feb_Week02_Units: 0,
      },
      {
        store: "Chicago Charm Boutique",
        sku: "Textured Knit Pullover",
        Feb_Week01_Units: 198,
        Feb_Week02_Units: 0,
      },
      {
        store: "Detroit Motor Gear",
        sku: "Oversized Cat-Eye Sunglasses",
        Feb_Week01_Units: 197,
        Feb_Week02_Units: 53,
      },
      {
        store: "Phoenix Sunwear",
        sku: "Tassel Fringe Handbag",
        Feb_Week01_Units: 196,
        Feb_Week02_Units: 0,
      },
      {
        store: "Las Vegas Neon Treasures",
        sku: "Faux Leather Leggings",
        Feb_Week01_Units: 196,
        Feb_Week02_Units: 0,
      },
      {
        store: "Atlanta Outfitters",
        sku: "Sporty Zip-Up Hoodie",
        Feb_Week01_Units: 196,
        Feb_Week02_Units: 0,
      },
      {
        store: "Charlotte Queens Closet",
        sku: "Asymmetrical Hem Skirt",
        Feb_Week01_Units: 196,
        Feb_Week02_Units: 0,
      },
      {
        store: "New York Empire Eats",
        sku: "Sherpa Lined Denim Jacket",
        Feb_Week01_Units: 195,
        Feb_Week02_Units: 0,
      },
      {
        store: "Portland Evergreen Goods",
        sku: "Diamond Stud Earrings",
        Feb_Week01_Units: 195,
        Feb_Week02_Units: 122,
      },
      {
        store: "Chicago Charm Boutique",
        sku: "Waterproof Hiking Boots",
        Feb_Week01_Units: 195,
        Feb_Week02_Units: 0,
      },
    ];
    setRowData(sampleData);
  }, []);

  // Column definitions
  const createWeekColumns = (weekNum: string | number, month: string) => {
    const prefix = `${month}_Week${weekNum.toString().padStart(2, "0")}`;

    return [
      {
        headerName: `Sales Units`,
        field: `${prefix}_Units`,
        editable: true,
        type: "numericColumn",
        width: 120,
        valueParser: (params: any): number => Number(params.newValue),
        cellStyle: { textAlign: "right" },
      },
      {
        headerName: `Sales Dollars`,
        valueGetter: (params: { data: RowData }): number => {
          const units = (params.data[`${prefix}_Units`] as number) || 0;
          const price = productData[params.data.sku as string]?.price || 0;
          return units * price;
        },
        width: 140,
        editable: false,
        valueFormatter: (params: any): string =>
          params.value ? `$ ${params.value.toFixed(2)}` : "$ 0.00",
        type: "numericColumn",
        cellStyle: { textAlign: "right" },
      },
      {
        headerName: `GM Dollars`,
        valueGetter: (params: { data: RowData }): number => {
          const units = (params.data[`${prefix}_Units`] as number) || 0;
          const price = productData[params.data.sku as string]?.price || 0;
          const cost = productData[params.data.sku as string]?.cost || 0;
          const salesDollars = units * price;
          const costDollars = units * cost;
          return salesDollars - costDollars;
        },
        width: 140,
        editable: false,
        valueFormatter: (params: any): string =>
          params.value ? `$ ${params.value.toFixed(2)}` : "$ 0.00",
        type: "numericColumn",
        cellStyle: { textAlign: "right" },
      },
      {
        headerName: `GM Percent`,
        valueGetter: (params: { data: RowData }): number => {
          const units = (params.data[`${prefix}_Units`] as number) || 0;
          const price = productData[params.data.sku as string]?.price || 0;
          const cost = productData[params.data.sku as string]?.cost || 0;
          const salesDollars = units * price;
          const costDollars = units * cost;
          const gmDollars = salesDollars - costDollars;

          if (salesDollars === 0) return 0;
          return (gmDollars / salesDollars) * 100;
        },
        width: 130,
        editable: false,
        valueFormatter: (params: any): string => `${params.value.toFixed(2)} %`,
        type: "numericColumn",
        cellStyle: (params: any): React.CSSProperties => {
          return {
            textAlign: "right",
            backgroundColor: getGmPercentBackground(params.value),
            color: params.value >= 10 ? "white" : "black",
          };
        },
      },
    ];
  };

  const columnDefs: any[] = [
    { headerName: "Store", field: "store", width: 220, pinned: "left" },
    { headerName: "SKU", field: "sku", width: 200, pinned: "left" },
    {
      headerName: "Feb",
      children: [
        {
          headerName: "Week 01",
          children: createWeekColumns("01", "Feb"),
        },
        {
          headerName: "Week 02",
          children: createWeekColumns("02", "Feb"),
        },
      ],
    },
  ];

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    suppressMovable: true,
    minWidth: 100, // Add a minimum width
  };
  function onGridReady(params: { api: any; columnApi: any }) {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  }

  // Handle cell value changes
  const onCellValueChanged = (params: any) => {
    console.log("Cell value changed:", params);

    // Refresh the row to update calculated values
    if (gridApi) {
      gridApi.refreshCells({
        rowNodes: [params.node],
        force: true,
      });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div
        className="ag-theme-alpine"
        style={{ height: "calc(100vh - 64px)", width: "100%" }}
      >
        <GridItem
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressRowClickSelection={true}
          rowSelection="multiple"
          onGridReady={onGridReady}
          onCellValueChanged={onCellValueChanged}
          // enableCellChangeFlash={true}
          modules={[ClientSideRowModelModule]}
          groupHeaderHeight={50}
          headerHeight={50}
          suppressHorizontalScroll={false}
          // domLayout="autoHeight"
        />
      </div>
    </Box>
  );
};

export default PlanningScreen;
