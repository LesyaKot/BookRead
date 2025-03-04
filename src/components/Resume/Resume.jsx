import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resume, fetchBooks } from "../../redux/book/operations";
import { selectBooks } from "../../redux/book/selectors";

import Rating from "../Rating/Rating";
import css from "./Resume.module.css";

export default function Resume({ isOpen, onClose, bookId }) {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);

  const book = useMemo(
    () => books.find((b) => b._id === bookId),
    [books, bookId]
  );

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    if (book) {
      setRating(book.rating || 0);
      setReview(book.feedback || "");
    }
  }, [bookId, book]);

  const handleSave = async () => {
    await dispatch(resume({ bookId, rating, feedback: review }));
    dispatch(fetchBooks());
  };

  return (
    isOpen && (
      <div
        className={css.overlay}
        onClick={(e) => e.target.classList.contains(css.overlay) && onClose()}
      >
        <div className={css.modal}>
          <p>Choose rating of the book</p>
          <Rating rating={rating} setRating={setRating} />
          <textarea
            placeholder="..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <div className={css.buttons}>
            <button onClick={onClose}>Back</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    )
  );
}
