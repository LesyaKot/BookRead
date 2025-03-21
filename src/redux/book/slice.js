import { createSlice } from "@reduxjs/toolkit";
import { addBook, fetchBooks, deleteBook, resume } from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          (book) => book._id !== action.payload.id
        );
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;

        const goingToReadBooks = (action.payload.goingToRead || []).map(
          (book) => ({
            ...book,
            status: "goingToRead",
          })
        );
        const currentlyReadingBooks = (
          action.payload.currentlyReading || []
        ).map((book) => ({
          ...book,
          status: "currentlyReading",
        }));
        const finishedReadingBooks = (action.payload.finishedReading || []).map(
          (book) => ({
            ...book,
            status: "finishedReading",
          })
        );
        state.items = [
          ...goingToReadBooks,
          ...currentlyReadingBooks,
          ...finishedReadingBooks,
        ];
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resume.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const updatedBook = action.payload;
        const index = state.items.findIndex(
          (book) => book._id === updatedBook._id
        );

        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            rating: updatedBook.rating,
            feedback: updatedBook.feedback,
            status: "finishedReading",
          };
        }
      });
  },
});

export const booksReducer = booksSlice.reducer;
export const selectBooks = (state) => state.books?.items ?? [];
