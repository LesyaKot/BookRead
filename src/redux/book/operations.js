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

      await axios.delete(`/book/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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


// planning currenlyReadBooks
export const currentlyRead = createAsyncThunk(
  "books/currentlyRead",
  async (planningData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const response = await axios.post(
        "https://bookread-backend.goit.global/planning",
        planningData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            withCredentials: true,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
