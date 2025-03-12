import React from "react";

import { Box, Toolbar } from "@mui/material";
import TopBar from "../components/TopBar";
import SideMenu from "../components/SideMenu";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <SideMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div
          className="content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Toolbar />
          Data Viewer App
          {children}
        </div>
      </Box>
    </Box>
  );
};

export default Layout;
