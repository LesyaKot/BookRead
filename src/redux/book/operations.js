import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// add book
export const addBook = createAsyncThunk(
  "books/add",
  async (bookData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const response = await axios.post(
        "https://bookread-backend.goit.global/book",
        bookData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// delete book
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) throw new Error("No auth token");

      await axios.delete(
        `https://bookread-backend.goit.global/book/${bookId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return { id: bookId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//   get all books
export const fetchBooks = createAsyncThunk(
  "books/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) return thunkAPI.rejectWithValue("No token provided");

      const response = await axios.get(
        "https://bookread-backend.goit.global/user/books",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// resume
export const resume = createAsyncThunk(
  "books/resume",
  async ({ bookId, rating, feedback }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No auth token found");
      }

      const response = await axios.patch(
        `https://bookread-backend.goit.global/book/review/${bookId}`,
        { rating, feedback },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? error.message ?? "Error updating review"
      );
    }
  }
);
