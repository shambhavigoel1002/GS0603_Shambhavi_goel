import React from "react";
import TopBar from "../components/TopBar";
import SideMenu from "../components/SideMenu";
import { Box, Toolbar, Typography } from "@mui/material";
import StoreGrid from "../components/StoreGrid";

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <SideMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div className="content">
          <Typography variant="h4">Dashboard</Typography>
          v df
          <StoreGrid />
        </div>
        {/* Dashboard content goes here */}
      </Box>
    </Box>
  );
};

export default Dashboard;
