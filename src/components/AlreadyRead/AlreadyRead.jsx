import { useState } from "react";
import { useSelector } from "react-redux";
import { selectBooks } from "../../redux/book/selectors";
import Resume from "../Resume/Resume.jsx";
import css from "./AlreadyRead.module.css";

export default function AlreadyRead() {
  const books = useSelector(selectBooks);
  const alreadyReadBooks = books.filter(
    (book) => book.status === "finishedReading"
  );

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleBookMoved = () => {
    setIsResumeOpen(false);
    setSelectedBookId(null);
  };

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
          onBookMoved={handleBookMoved}
        />
      )}
    </div>
  );
}
