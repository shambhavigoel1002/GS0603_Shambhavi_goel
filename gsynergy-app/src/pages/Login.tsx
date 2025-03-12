import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  CircularProgress
} from "@mui/material";
import { LockOutlined, MailOutline } from "@mui/icons-material";

// Add this type definition based on your Redux store structure
interface RootState {
  auth: {
    isAuthenticated: boolean;
    user: string | null;
  };
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get auth state from Redux
  const authState = useSelector((state: RootState) => state.auth);

  // Check if user is already logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("user");

    // If authenticated in localStorage but not in Redux, restore the state
    if (
      isAuthenticated === "true" &&
      storedUser &&
      !authState.isAuthenticated
    ) {
      dispatch(login(storedUser));
    }

    // Navigate to stores if authenticated (either from redux or localStorage)
    if (isAuthenticated === "true" || authState.isAuthenticated) {
      navigate("/stores");
    }
  }, [navigate, dispatch, authState.isAuthenticated]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 5 && password !== "admin") {
      // Exception for "admin"
      newErrors.password = "Password must be at least 5 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e?: React.FormEvent<HTMLFormElement>) => {
    // Prevent default form behavior
    if (e) {
      e.preventDefault();
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Simulate API call
    setIsLoading(true);

    try {
      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Check credentials (hardcoded for this example)
      if (email !== "admin@gmail.com" || password !== "admin") {
        setErrors({ general: "Invalid email or password" });
        setIsLoading(false);
        return;
      }

      // Clear errors and proceed with login
      setErrors({});

      // Store authentication state in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", email);

      // Update Redux state
      dispatch(login(email));

      navigate("/stores");
    } catch (error) {
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keypress events
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Grid item xs={11} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight="500">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleLogin}
          >
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutline />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                )
              }}
            />
            {errors.general && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                sx={{ mt: 1 }}
              >
                {errors.general}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
                height: 48,
                textTransform: "none",
                fontSize: "1rem"
              }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Login"}
            </Button>
            <Typography variant="body2" align="center" color="textSecondary">
              Use email: admin@gmail.com / password: admin
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
