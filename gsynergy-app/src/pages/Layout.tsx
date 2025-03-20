import React from "react";

import { Box, Toolbar, Typography } from "@mui/material";
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
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 2 }}>
        <div
          className="content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "rgba(0, 0, 0, 0.54)",
          }}
        >
          <Typography variant="h4">Data Viewer App</Typography>
          {children}
        </div>
      </Box>
    </Box>
  );
};

export default Layout;
