import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider
} from "@mui/material";
import { Link } from "react-router-dom";
import menuItems from "./menuItem";

// Constants
const drawerWidth = 240;
const collapsedDrawerWidth = 60;

const SideMenu: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
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
          boxSizing: "border-box"
        }
      }}
      className="sidebar"
    >
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {drawerOpen && (
              <ListItemText primary={item.text} className="side-menu-list" />
            )}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
