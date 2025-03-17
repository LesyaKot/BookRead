import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { planning } from "../../redux/planning/operations";
import { selectBooks } from "../../redux/book/selectors";
import { toast } from "react-hot-toast";
import { FaRegCalendarAlt } from "react-icons/fa";
import css from "./Planning.module.css";

export default function Planning({ isOpen, onClose, onBookMoved }) {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);

  const goingToReadBooks = books.filter(
    (book) => book.status === "goingToRead"
  );

  const [selectedBookId, setSelectedBookId] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleCurrentlyRead = () => {
    if (!selectedBookId || !startDate || !endDate) {
      toast.error("Please fill in all fields!");
      return;
    }

    const planningData = {
      startDate: new Date(startDate).toISOString().split("T")[0],
      endDate: new Date(endDate).toISOString().split("T")[0],
      books: [selectedBookId],
    };

    console.log("📤 Відправляємо на сервер:", planningData);

    dispatch(planning(planningData))
      .unwrap()
      .then(() => {
        toast.success("Book moved to Currently Reading!");
        onBookMoved(selectedBookId);
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
          <button className={css.closeBtn} onClick={onClose}>
            ✖
          </button>
          <div className={css.inputWrap}>
            <FaRegCalendarAlt className={css.icon} />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start"
              dateFormat="dd/MM/yyyy"
              className={css.input}
              customInput={<input className={css.inputWithIcon} />}
            />
          </div>

          <div className={css.inputWrap}>
            <FaRegCalendarAlt className={css.icon} />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="Finish"
              dateFormat="dd/MM/yyyy"
              className={css.input}
              customInput={<input className={css.inputWithIcon} />}
            />
          </div>

          <div className={css.inputWrap}>
            <select
              value={selectedBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
              className={css.input}
            >
              <option value="" disabled>
                Choose book from the library
              </option>
              {goingToReadBooks.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>

          <button className={css.addBtn} onClick={handleCurrentlyRead}>
            Add
          </button>
        </div>
      </div>
    )
  );
}
