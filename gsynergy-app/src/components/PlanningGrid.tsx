import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise/dist/styles/ag-grid-enterprise.css";
import { ClientSideRowModelModule } from "ag-grid-community";
import * as XLSX from "xlsx";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Drawer,
  Divider,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const PlanningScreen = () => {
  interface RowData {
    store: string;
    sku: string;
    Feb_Week01_Units: number;
    Feb_Week02_Units: number;
  }

  const [rowData, setRowData] = useState<RowData[]>([]);
  const [gridApi, setGridApi] = useState<null | any>(null);
  const [gridColumnApi, setGridColumnApi] = useState<null | any>(null);

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
    const sampleData = [
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
  const createWeekColumns = (weekNum, month) => {
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
          const units = params.data[`${prefix}_Units`] || 0;
          const price = productData[params.data.sku]?.price || 0;
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
        valueGetter: (params: any): number => {
          const units = params.data[`${prefix}_Units`] || 0;
          const price = productData[params.data.sku]?.price || 0;
          const cost = productData[params.data.sku]?.cost || 0;
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
        valueGetter: (params: any): number => {
          const units = params.data[`${prefix}_Units`] || 0;
          const price = productData[params.data.sku]?.price || 0;
          const cost = productData[params.data.sku]?.cost || 0;
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

  const columnDefs = [
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
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  };

  // Handle cell value changes
  const onCellValueChanged = (params) => {
    console.log("Cell value changed:", params);

    // Refresh the row to update calculated values
    if (gridApi) {
      gridApi.refreshCells({
        rowNodes: [params.node],
        force: true,
      });
    }
  };

  // Sidebar navigation items
  const navItems = [
    { text: "Store", icon: <StoreIcon /> },
    { text: "SKU", icon: <CategoryIcon /> },
    { text: "Planning", icon: <CalendarViewMonthIcon /> },
    { text: "Charts", icon: <InsertChartIcon /> },
  ];

  const drawerWidth = 140;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Navigation sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" component="div" sx={{ color: "#4b6584" }}>
              G Synergy
            </Typography>
          </Box>
        </Toolbar>
        <Divider />
        <List>
          {navItems.map((item, index) => (
            <ListItem
              button
              key={item.text}
              selected={item.text === "Planning"}
              sx={{
                py: 2,
                "&.Mui-selected": {
                  backgroundColor: index === 2 ? "#e3f2fd" : "transparent",
                  "&:hover": { backgroundColor: "#e3f2fd" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ backgroundColor: "white", borderBottom: "1px solid #e0e0e0" }}
        >
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Data Viewer App
            </Typography>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 0 }}>
          <div
            className="ag-theme-alpine"
            style={{ height: "calc(100vh - 64px)", width: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              suppressRowClickSelection={true}
              rowSelection="multiple"
              onGridReady={onGridReady}
              onCellValueChanged={onCellValueChanged}
              enableCellChangeFlash={true}
              modules={[ClientSideRowModelModule]}
              groupHeaderHeight={50}
              headerHeight={50}
              suppressHorizontalScroll={false}
              domLayout="normal"
            />
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default PlanningScreen;
