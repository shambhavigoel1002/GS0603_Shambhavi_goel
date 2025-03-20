import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  loading: boolean;
}

// Initialize state from localStorage if available
const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  user: localStorage.getItem("user"),
  loading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      // Store in localStorage for persistence
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // Clear localStorage on logout
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
