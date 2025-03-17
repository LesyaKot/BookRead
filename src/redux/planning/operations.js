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
  
        if (!planningData || typeof planningData !== "object") {
          return thunkAPI.rejectWithValue("Invalid planning data");
        }
  
        console.log("📤 Sending planning request:", planningData);
  
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
        console.log("✅ Відповідь сервера (currentlyRead):", response.data);
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Error in currentlyRead";
        console.error("❌ Помилка в currentlyRead:", errorMessage);
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );
  
  
  axios.defaults.baseURL = 'https://bookread-backend.goit.global';
  
  export const updatePlanning = createAsyncThunk(
    'planning/updatePlanning',
    async ({ pages, token }, { rejectWithValue }) => {
      try {
        const { data } = await axios.patch(
          '/planning',
          { pages },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Не вдалося оновити прочитані сторінки');
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
  
        console.log("🔍 Fetching planning with token:", token);
  
        const response = await axios.get(
          "https://bookread-backend.goit.global/planning",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("✅ FetchPlanning Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("❌ FetchPlanning Error:", error.response?.data || error.message);
        return thunkAPI.rejectWithValue(error.response?.data || "Error fetching planning");
      }
    }
  );


  
