import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { planning, getPlanning } from "../../redux/planning/operations";
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

  const [selectedBookIds, setSelectedBookIds] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(getPlanning());
  }, [dispatch]);

  const handleCurrentlyRead = async () => {
    if (selectedBookIds.length === 0 || !startDate || !endDate) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      let existingPlanning;

      try {
        existingPlanning = await dispatch(getPlanning()).unwrap();
      } catch (error) {
        existingPlanning = null;
      }

      const planningData = {
        startDate: new Date(startDate).toISOString().split("T")[0],
        endDate: new Date(endDate).toISOString().split("T")[0],
        books: selectedBookIds,
      };

      if (existingPlanning) {
        const existingBooks = existingPlanning?.books || [];
        const existingBookIds = existingBooks.map((book) => book._id);
        const allBookIds = Array.from(
          new Set([...existingBookIds, ...selectedBookIds])
        );

        planningData.books = allBookIds;
      }

      await dispatch(planning(planningData)).unwrap();
      toast.success("Books added to the reading plan!");

      selectedBookIds.forEach((id) => onBookMoved(id));
      onClose();
    } catch (error) {
      console.error("Planning update error:", error);
      toast.error("Failed to update planning");
    }
  };

  const handleSelectChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
    setSelectedBookIds(selected);
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
              multiple
              value={selectedBookIds}
              onChange={handleSelectChange}
              className={css.input}
            >
              <option disabled>Choose books from the library</option>
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
