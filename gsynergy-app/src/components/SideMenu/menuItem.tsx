// menuItems.ts
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import React from "react";

export interface MenuItem {
  text: string;
  path: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    text: "Stores",
    path: "/stores",
    icon: <StoreIcon />
  },
  {
    text: "SKUs",
    path: "/skus",
    icon: <CategoryIcon />
  },
  {
    text: "Planning",
    path: "/planning",
    icon: <CalendarViewMonthIcon />
  },
  {
    text: "Charts",
    path: "/charts",
    icon: <InsertChartIcon />
  }
];

export default menuItems;
