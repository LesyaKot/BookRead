import { fetchBooks } from "../../redux/book/operations.js";
import { useEffect } from "react";
import { selectBooks, selectBooksLoading } from "../../redux/book/selectors.js";
import { useSelector, useDispatch } from "react-redux";
import css from "./GoingToRead.module.css";

export default function GoingToRead() {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const isLoading = useSelector(selectBooksLoading);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    console.log("Books in state:", books);
  }, [books]);

  return (
    <div className={css.wrap}>
      <h2>Going to read</h2>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <div key={book._id}>{book.title}</div>
          ))}
        </ul>
      ) : (
        !isLoading && <p>No books found.</p>
      )}
    </div>
  );
}
