import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const planning = createAsyncThunk(
  "books/planning",
  async (planningData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      const response = await axios.post(
        "https://bookread-backend.goit.global/planning",
        planningData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error in currentlyRead";

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const updatePlanning = createAsyncThunk(
  "planning/updatePlanning",
  async ({ pages }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      const { data } = await axios.patch(
        "/planning",
        { pages },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "can't read pages"
      );
    }
  }
);

export const getPlanning = createAsyncThunk(
  "planning/getPlanning",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No auth token found");
      }

      const response = await axios.get(
        "https://bookread-backend.goit.global/planning",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data && response.data.planning) {
        return response.data.planning;
      }

      return thunkAPI.rejectWithValue("Your planning has already ended");
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching planning"
      );
    }
  }
);
