import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://bookread-backend.goit.global";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// dana1111@gmail.com

// // GOOGLE
// export const googleLogin = createAsyncThunk(
//   "auth/googleLogin",
//   async (credential, thunkAPI) => {
//     try {

//       const response = await fetch(`/auth/google?token=${encodeURIComponent(credential)}`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await response.json();
//       console.log(data);

//       if (!response.ok) {
//         throw new Error(data.message || "Authentication failed");
//       }

//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async ({ accessToken, refreshToken, sid }, thunkAPI) => {
    try {
      return { accessToken, refreshToken, sid };
    } catch (error) {
      console.error("Google Login Error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      console.error("error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// log in
export const logIn = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", userInfo);
      setAuthHeader(response.data.token);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// log out
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token provided");
    }

    await axios.post(
      "https://bookread-backend.goit.global/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// refresh token
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const sid = state.auth.sid;

    if (!sid) {
      return thunkAPI.rejectWithValue("No session ID (sid) found");
    }

    try {
      const response = await axios.post(
        "/auth/refresh",
        { sid }, 
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

