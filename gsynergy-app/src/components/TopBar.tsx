import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const TopBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    handleCloseModal();
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className="topbar">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <img src="/assets/logo.svg" alt="Logo" style={{ height: 40 }} />{" "}
          </Typography>
          <IconButton color="inherit" onClick={handleOpenModal}>
            <AccountCircleOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Logout Confirmation Modal */}
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="secondary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TopBar;
