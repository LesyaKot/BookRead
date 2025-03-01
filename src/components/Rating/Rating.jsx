import { FaStar, FaRegStar } from "react-icons/fa";
import css from "./Rating.module.css";

export default function Rating({ rating, setRating }) {
  return (
    <div className={css.wrap}>
      {[...Array(5)].map((_, index) => (
        <span key={index} onClick={() => setRating(index + 1)}>
          {index < rating ? <FaStar color="gold" /> : <FaRegStar color="gray" />}
        </span>
      ))}
    </div>
  );
}
