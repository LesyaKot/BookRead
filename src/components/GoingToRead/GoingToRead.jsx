import { fetchBooks, deleteBook } from "../../redux/book/operations.js";
import { useEffect } from "react";
import { selectBooks, selectBooksLoading } from "../../redux/book/selectors.js";
import { useSelector, useDispatch } from "react-redux";
import css from "./GoingToRead.module.css";
import { toast } from "react-hot-toast";

export default function GoingToRead() {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const isLoading = useSelector(selectBooksLoading);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBook(id))
      .unwrap()
      .then(() => toast.success("Book deleted!"))
      .catch(() => toast.error("Failed to delete book"));
  };

  return (
    <div className={css.wrap}>
      <h2>Going to read</h2>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book._id} className={css.bookItem}>
              <span>{book.title}</span>
              <button
                className={css.btn}
                type="button"
                onClick={() => handleDelete(book._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>No books found.</p>
      )}
    </div>
  );
}
