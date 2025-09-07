import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: unknown | null;
  accessToken: string | null | undefined;
}

const initialState: AuthState = {
  user:
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
  accessToken:
    typeof window !== "undefined" && localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: unknown; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;

      // Save in localStorage
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;

      // Remove from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export default authSlice.reducer;
