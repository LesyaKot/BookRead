import { useSelector } from "react-redux";
import { selectBooks } from "../../redux/book/selectors";
import { MdMenuBook } from "react-icons/md";
import css from "./CurrentlyReading.module.css";

export default function CurrentlyReading() {
  const books = useSelector(selectBooks);

  const currentlyReadingBooks = books.filter(
    (book) => book.status === "currentlyReading"
  );

  return (
    <div>
      <h2 className={css.title}>Reading now</h2>
      <ul className={css.list}>
        {currentlyReadingBooks.map((book) => (
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
    </div>
  );
}
