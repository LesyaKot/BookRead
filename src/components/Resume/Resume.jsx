import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resume } from "../../redux/book/operations";
import { selectBooks } from "../../redux/book/selectors";
import { toast } from "react-hot-toast";
import Rating from "../Rating/Rating";
import css from "./Resume.module.css";

export default function Resume({ isOpen, onClose, bookId, onBookMoved }) {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const book = books.find((b) => b._id === bookId);
  
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSave = () => {
    const resumeData = {
      bookId,
      pages: book.pagesTotal,
      review,
      rating,
    };

    dispatch(resume(resumeData))
      .unwrap()
      .then(() => {
        toast.success("Book moved to Already Read!");
        onBookMoved(bookId);
        onClose();
      })
      .catch(() => toast.error("Failed to move book"));
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
            placeholder="Write your review..."
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
