import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

const DashboardPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout functionality here
    console.log("Logout clicked");
    navigate("/");
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top Bar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar variant="dense">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <img src="/assets/logo.svg" alt="Logo" style={{ height: 40 }} />{" "}
            {/* Add your logo */}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Collapsible Sidebar */}
      <Drawer
        variant="permanent"
        onMouseEnter={toggleDrawer(true)}
        onMouseLeave={toggleDrawer(false)}
        sx={{
          width: drawerOpen ? drawerWidth : collapsedDrawerWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          "& .MuiDrawer-paper": {
            width: drawerOpen ? drawerWidth : collapsedDrawerWidth,
            transition: "width 0.3s",
            overflowX: "hidden",
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem component={Link} to="/stores">
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Stores" />}
          </ListItem>
          <ListItem component={Link} to="/skus">
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="SKUs" />}
          </ListItem>
          <ListItem component={Link} to="/planning">
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Planning" />}
          </ListItem>
          <ListItem component={Link} to="/charts">
            <ListItemIcon>
              <ShowChartIcon />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Charts" />}
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4">Welcome to the Dashboard</Typography>
        {/* Add your dashboard content here */}
      </Box>
    </Box>
  );
};

export default DashboardPage;
