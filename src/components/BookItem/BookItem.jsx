import { MdMenuBook } from "react-icons/md";
import { deleteBook } from "../../redux/book/operations.js";
import {  useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import css from "./BookItem.module.css";

export default function BookItem({ book }) {
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteBook(id))
          .unwrap()
          .then(() => toast.success("Book deleted!"))
          .catch(() => toast.error("Failed to delete book"));
      };
  return (
    <li key={book._id} className={css.listItem}>
    <MdMenuBook className={css.icon}/>
    <div className={css.textWrap}>
    <p className={css.text}>{book.title}</p>
    <p className={css.text}><span className={css.accent}>Author: </span> {book.author}</p>
    <p className={css.text}><span className={css.accent}>Year: </span> {book.publishYear}</p>
    <p className={css.text}><span className={css.accent}>Pages: </span> {book.pagesTotal}</p>
    <button
      className={css.btn}
      type="button"
      onClick={() => handleDelete(book._id)}
    >
      Delete
    </button>
    </div>
  </li>
  );
}
