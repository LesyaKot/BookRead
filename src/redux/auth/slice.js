import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  logIn,
  logOut,
  refreshUser,
  googleLogin,
} from "./operations";

const initialState = {
  user: { name: null, email: null },
  token: null,
  refreshToken: null,
  sid: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.userData;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        console.log("Login fulfilled:", action.payload);
        state.user = action.payload.userData;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.refreshToken = null;
        state.sid = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.userData;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        console.log("Google login fulfilled:", action.payload);
        state.user = action.payload.userData;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
        state.isLoggedIn = true;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = { name: null, email: null };
        state.token = null;
        console.error("Google Login failed:", action.error.message);
      });
  },
});
export const authReducer = authSlice.reducer;
