import { createSlice } from "@reduxjs/toolkit";
import { planning, updatePlanning, getPlanning } from "./operations";

const initialState = {
  planning: null,
  isLoading: false,
  error: null,
};

const planningSlice = createSlice({
  name: "planning",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(planning.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(planning.fulfilled, (state, action) => {
        state.planning = action.payload;
        state.planningEnded = false;
      })
      .addCase(planning.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePlanning.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePlanning.fulfilled, (state, action) => {
        state.isLoading = false;
        state.planning = action.payload.planning || action.payload;
      })
      .addCase(updatePlanning.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getPlanning.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getPlanning.fulfilled, (state, action) => {
        state.isLoading = false;
        state.planning = action.payload?.planning || action.payload;
      })

      .addCase(getPlanning.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.planning = null;
      });
  },
});

export const planningReducer = planningSlice.reducer;
export const selectPlanning = (state) => state.planning?.planning ?? null;
