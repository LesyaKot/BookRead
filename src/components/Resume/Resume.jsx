import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resume, fetchBooks } from "../../redux/book/operations";
import { selectBooks } from "../../redux/book/selectors";
import Rating from "../Rating/Rating";
import css from "./Resume.module.css";
import toast from "react-hot-toast";

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

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleSave = async () => {
    if (rating === 0) {
      toast("Please select a rating before saving.");
      return;
    }

    if (review.trim() === "") {
      toast("Please write a review before saving.");
      return;
    }

    const payload = {
      bookId,
      rating,
      feedback: review.trim(),
    };

    await dispatch(resume(payload));
    dispatch(fetchBooks());
    onClose();
  };

  return (
    isOpen && (
      <div
        className={css.overlay}
        onClick={(e) => e.target.classList.contains(css.overlay) && onClose()}
      >
        <div className={css.modal}>
          <p className={css.text}>Choose rating of the book</p>
          <div className={css.ratingWrap}>
            <Rating rating={rating} setRating={setRating} />
            <p className={css.text}>Resume</p>
            <textarea
              className={css.input}
              placeholder="..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div className={css.buttons}>
            <button className={css.btn} onClick={onClose}>
              Back
            </button>
            <button
              className={`${css.btn} ${rating > 0 ? css.active : ""}`}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
}
