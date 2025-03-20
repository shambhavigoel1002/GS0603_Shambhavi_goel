import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Define RootState type based on your Redux store
interface RootState {
  auth: {
    isAuthenticated: boolean;
  };
}

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Check localStorage as fallback (in case Redux state is reset)
  const isAuthenticatedInStorage =
    localStorage.getItem("isAuthenticated") === "true";

  // Allow access if authenticated either in Redux or localStorage
  if (isAuthenticated || isAuthenticatedInStorage) {
    return <Outlet />;
  }

  // Redirect to login if not authenticated
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
