import { useSelector, useDispatch } from "react-redux";
import { selectBooks } from "../../redux/book/selectors";
import { MdMenuBook } from "react-icons/md";
import css from "./CurrentlyReading.module.css";
import { useState } from "react";
import { updateReadPages } from "../../redux/book/operations";

export default function CurrentlyReading() {
  const books = useSelector(selectBooks);
  const dispatch = useDispatch();
  const [pagesRead, setPagesRead] = useState({});

  const currentlyReadingBooks = books.filter(
    (book) => book.status === "currentlyReading"
  );

  const handleInputChange = (bookId, value) => {
    setPagesRead((prev) => ({
      ...prev,
      [bookId]: value,
    }));
  };

  const handleUpdatePages = (bookId) => {
    const pages = Number(pagesRead[bookId] || 0);
    if (pages > 0) {
      dispatch(updateReadPages({ bookId, pagesRead: pages }));
      setPagesRead((prev) => ({ ...prev, [bookId]: "" }));
    }
  };

  return (
    <div>
      <h2>Reading now</h2>
      <ul className={css.list}>
        {currentlyReadingBooks.map((book) => (
          <li key={book._id} className={css.listItem}>
            <MdMenuBook className={css.icon} />
            <div className={css.textWrap}>
              <p className={css.text}>{book.title}</p>
              <p className={css.text}>
                <span className={css.accent}>Author: </span> {book.author}
              </p>
              <p className={css.text}>
                <span className={css.accent}>Year: </span> {book.publishYear}
              </p>
              <p className={css.text}>
                <span className={css.accent}>Pages: </span> {book.pagesTotal}
                <span className={css.accent}>Pages Read: </span>{" "}
                {book.pagesFinished}/{book.pagesTotal}
              </p>
            </div>
            <input
              type="number"
              min="1"
              max={book.pagesTotal - book.pagesFinished}
              value={pagesRead[book._id] || ""}
              onChange={(e) => handleInputChange(book._id, e.target.value)}
              className={css.input}
              placeholder="Pages read"
            />
            <button onClick={() => handleUpdatePages(book._id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
