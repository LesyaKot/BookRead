import css from "./Modal.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../redux/book/operations";

export default function Modal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [pagesTotal, setPagesTotal] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    } else if (!/[a-zA-Zа-яА-Я]/.test(title)) {
      newErrors.title = "Title must contain at least one letter.";
    }

    if (!author.trim()) {
      newErrors.author = "Author is required.";
    } else if (!/[a-zA-Zа-яА-Я]/.test(author)) {
      newErrors.author = "Author must contain at least one letter.";
    }

    if (!publishYear.trim()) {
      newErrors.publishYear = "Publication year is required.";
    } else if (!/^\d{4}$/.test(publishYear)) {
      newErrors.publishYear = "Enter a valid year (e.g., 2024).";
    } else if (parseInt(publishYear) > currentYear) {
      newErrors.publishYear = `Year cannot be greater than ${currentYear}.`;
    }

    if (!pagesTotal.trim()) {
      newErrors.pagesTotal = "Number of pages is required.";
    } else if (!/^\d+$/.test(pagesTotal) || parseInt(pagesTotal) <= 0) {
      newErrors.pagesTotal = "Enter a valid positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newBook = { title, author, publishYear, pagesTotal };
    dispatch(addBook(newBook));

    setTitle("");
    setAuthor("");
    setPublishYear("");
    setPagesTotal("");
    setErrors({});
  };

  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target.className.includes("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.close} onClick={onClose}>
          &times;
        </button>

        <form className={css.form} onSubmit={handleSubmit}>
          <label className={css.label}>
            Book title
            <input
              className={css.input}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="..."
            />
          </label>
          {errors.title && <p className={css.error}>{errors.title}</p>}

          <label className={css.label}>
            Author
            <input
              className={css.input}
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="..."
            />
          </label>
          {errors.author && <p className={css.error}>{errors.author}</p>}

          <label className={css.label}>
            Publication date
            <input
              className={css.input}
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              placeholder="..."
            />
          </label>
          {errors.publishYear && (
            <p className={css.error}>{errors.publishYear}</p>
          )}

          <label className={css.label}>
            Amount of pages
            <input
              className={css.input}
              type="text"
              value={pagesTotal}
              onChange={(e) => setPagesTotal(e.target.value)}
              placeholder="..."
            />
          </label>
          {errors.pagesTotal && (
            <p className={css.error}>{errors.pagesTotal}</p>
          )}

          <button className={css.addBtn} type="submit">
            Add
          </button>
        </form>
      </div>

      <div>
        <h2>Step 1.</h2>
        <h3>Create your own library</h3>
        <p>Add there books which you are going to read.</p>
        <h2>Step 2.</h2>
        <h3>Create your first training</h3>
        <p>Set a goal, choose period, start training.</p>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
