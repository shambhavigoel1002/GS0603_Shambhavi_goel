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
import { Store, Inventory, EventNote, ShowChart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import InsertChartIcon from "@mui/icons-material/InsertChart";
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
        <ListItem component={Link} to="/stores">
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Stores" />}
        </ListItem>
        <ListItem component={Link} to="/skus">
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="SKUs" />}
        </ListItem>
        <ListItem component={Link} to="/planning">
          <ListItemIcon>
            <CalendarViewMonthIcon />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Planning" />}
        </ListItem>
        <ListItem component={Link} to="/charts">
          <ListItemIcon>
            <InsertChartIcon />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Charts" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideMenu;
