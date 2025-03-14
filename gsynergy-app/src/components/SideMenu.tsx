import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";
import { Store, Inventory, EventNote, ShowChart } from "@mui/icons-material";
import { Link } from "react-router-dom";

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
          boxSizing: "border-box",
        },
      }}
      className="sidebar"
    >
      <Toolbar />
      <Divider />
      <List>
        <ListItem component={Link} to="/stores">
          <ListItemIcon>
            <Store />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Stores" />}
        </ListItem>
        <ListItem component={Link} to="/skus">
          <ListItemIcon>
            <Inventory />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="SKUs" />}
        </ListItem>
        <ListItem component={Link} to="/planning">
          <ListItemIcon>
            <EventNote />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Planning" />}
        </ListItem>
        <ListItem component={Link} to="/charts">
          <ListItemIcon>
            <ShowChart />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Charts" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideMenu;
