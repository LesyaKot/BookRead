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
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Відповідь сервера:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ !!!!!! в currentlyRead:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);



// // resume 
export const resume = createAsyncThunk("books/resume", async ({ bookId, rating, feedback }, thunkAPI) => {
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
    return thunkAPI.rejectWithValue(error.response?.data || "Error updating review");
  }
});


// update amount of pages
// export const updateReadPages = createAsyncThunk(
//   "books/updateReadPages",
//   async ({ bookId, pagesRead }, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const token = state.auth.token;

//     if (!token) {
//       return thunkAPI.rejectWithValue("No token found");
//     }

//     try {   
      
//       const response = await axios.patch(
//         "https://bookread-backend.goit.global/planning",
//         { pages: pagesRead },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("API Response:", response.data);

     
//       return { bookId, pagesRead };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

export const updateReadPages = createAsyncThunk(
  "books/updateReadPages",
  async ({ bookId, pagesRead }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.accessToken || localStorage.getItem("token"); 

      if (!token) {
        return rejectWithValue("No token provided");
      }

      const response = await axios.patch(
        "https://bookread-backend.goit.global/planning",
        { pages: pagesRead },
        { headers: { Authorization: `Bearer ${token}` } } 
      );

      return { bookId, pagesFinished: response.data.book.pagesFinished };
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);