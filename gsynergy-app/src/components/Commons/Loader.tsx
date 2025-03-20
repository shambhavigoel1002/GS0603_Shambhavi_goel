import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = "Loading data..." }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      padding="20px"
    >
      <CircularProgress size={60} thickness={4} style={{ color: "#f97316" }} />
      <Typography variant="h6" style={{ marginTop: 16, color: "#4B5563" }}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loader;
