export const selectBooks = (state) => state.books?.items ?? [];
export const selectBooksLoading = (state) => state.books?.isLoading || false;
export const selectBooksError = (state) => state.books?.error || null;
export const selectPlanning = (state) => state.books.planning;
// export const selectBooks = (state) => state.books.books;
