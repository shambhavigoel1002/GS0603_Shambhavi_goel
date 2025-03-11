import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  InputAdornment,
} from "@mui/material";
import { LockOutlined, MailOutline } from "@mui/icons-material";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e?: React.FormEvent<HTMLFormElement>) => {
    // Prevent default form behavior
    if (e) {
      e.preventDefault();
    }

    // Simple validation
    if (username.trim() === "" || password.trim() === "") {
      setError("Username and password are required.");
      return;
    }

    // Clear error and proceed with login
    setError("");
    dispatch(login(username));
    navigate("/dashboard");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          {/* Wrap the form with <form> tag to capture Enter key */}
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleLogin}
          >
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutline />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
              onClick={() => handleLogin()}
              type="submit"
            >
              Login Data Viewer
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
