import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const TopBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="fixed">
      <Toolbar className="topbar">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <img src="/assets/logo.svg" alt="Logo" style={{ height: 40 }} />{" "}
        </Typography>
        <IconButton color="inherit" onClick={handleLogout}>
          <AccountCircleOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
