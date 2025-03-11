import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/book/operations.js";
import { selectBooks } from "../../redux/book/selectors.js";
import { MdMenuBook } from "react-icons/md";
import Planning from "../Planning/Planning.jsx";
import css from "./GoingToRead.module.css";

export default function GoingToRead() {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const [goingToReadBooks, setGoingToReadBooks] = useState([]);
  const [isPlanningOpen, setIsPlanningOpen] = useState(false);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [dispatch, books.length]);

  useEffect(() => {
    setGoingToReadBooks(books.filter((book) => book.status === "goingToRead"));
  }, [books]);

  const handleBookMoved = (bookId) => {
    setGoingToReadBooks((prevBooks) =>
      prevBooks.filter((book) => book._id !== bookId)
    );
  };

  return (
    <div className={css.wrap}>
      <h2 className={css.title}>Going to read</h2>
      <ul className={css.list}>
        {goingToReadBooks.map((book) => (
          <li key={book._id} className={css.listItem}>
            <div className={css.titleWrap}>
              <MdMenuBook className={css.icon} />
              <p className={css.text}>{book.title}</p>
            </div>
            <div className={css.textWrap}>
              <p className={css.text}>
                <span className={css.accent}>Author: </span> {book.author}
              </p>
              <p className={css.text}>
                <span className={css.accent}>Year: </span> {book.publishYear}
              </p>
              <p className={css.text}>
                <span className={css.accent}>Pages: </span> {book.pagesTotal}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <button className={css.trainBtn} onClick={() => setIsPlanningOpen(true)}>
        My training
      </button>

      {isPlanningOpen && (
        <Planning
          isOpen={isPlanningOpen}
          onClose={() => setIsPlanningOpen(false)}
          onBookMoved={handleBookMoved}
        />
      )}
    </div>
  );
}
