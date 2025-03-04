import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBooks } from "../../redux/book/selectors";
import { fetchBooks } from "../../redux/book/operations";
import Resume from "../Resume/Resume.jsx";
import Rating from "../Rating/Rating.jsx";
import css from "./AlreadyRead.module.css";

export default function AlreadyRead() {
  const books = useSelector(selectBooks);
  const alreadyReadBooks = books.filter(
    (book) => book.status === "finishedReading"
  );

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch, books.length]);

  return (
    <div>
      <h2>Already read</h2>
      <ul className={css.list}>
        {alreadyReadBooks.map((book) => (
          <li key={book._id} className={css.listItem}>
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
              </p>
              {book.rating && (
                <div className={css.feedback}>
                  <span className={css.accent}>Rating:</span>
                  <Rating rating={book.rating} />
                </div>
              )}
              {book.feedback && (
                <p className={css.feedback}>
                  <span className={css.accent}>Review: </span> {book.feedback}
                </p>
              )}
            </div>
            <div>
              <ul>
                {Array.isArray(book.feedback) &&
                  book.feedback.map((review, index) => (
                    <li key={index}>
                      <Rating />
                      <p>⭐ {book.rating[index]} stars</p>
                      <p>{review}</p>
                    </li>
                  ))}
              </ul>
            </div>
            <button
              onClick={() => {
                setSelectedBookId(book._id);
                setIsResumeOpen(true);
              }}
            >
              Resume
            </button>
          </li>
        ))}
      </ul>
      {isResumeOpen && selectedBookId !== null && (
        <Resume
          isOpen={isResumeOpen}
          onClose={() => {
            setIsResumeOpen(false);
            setSelectedBookId(null);
          }}
          bookId={selectedBookId}
        />
      )}
    </div>
  );
}
