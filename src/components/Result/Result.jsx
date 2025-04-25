import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import { getPlanning, updatePlanning } from "../../redux/planning/operations";
import {
  selectPlanning,
  selectIsLoading,
} from "../../redux/planning/selectors";

import css from "./Result.module.css";

export default function Result() {
  const [startDate, setStartDate] = useState(null);
  const [numberOfPages, setNumberOfPages] = useState("");

  const dispatch = useDispatch();
  const planning = useSelector(selectPlanning);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getPlanning());
  }, [dispatch]);

  if (isLoading) return <p>Завантаження даних...</p>;

  const handleAddPages = async () => {
    if (!startDate || !numberOfPages) {
      toast.error("Please fill in all fields!");
      return;
    }

    const pagesToAdd = Number(numberOfPages);

    const pagesLeft = planning.books
      ?.filter((book) => book.pagesFinished < book.pagesTotal)
      .reduce((sum, book) => {
        const remaining = book.pagesTotal - book.pagesFinished;
        return sum + remaining;
      }, 0);

    if (pagesToAdd > pagesLeft) {
      toast.error(
        `Too many pages! Only ${pagesLeft} pages left to read in this plan.`
      );
      return;
    }

    try {
      const prevFinishedBookIds =
        planning?.books?.length > 0
          ? planning.books
              .filter((book) => book.pagesFinished >= book.pagesTotal)
              .map((book) => book._id)
          : [];

      await dispatch(updatePlanning({ pages: pagesToAdd })).unwrap();

      const updatedPlanning = await dispatch(getPlanning()).unwrap();

      const updatedBooks = updatedPlanning?.books || [];

      const newFinishedBooks = updatedBooks.filter(
        (book) =>
          book.pagesFinished >= book.pagesTotal &&
          !prevFinishedBookIds.includes(book._id)
      );

      if (newFinishedBooks.length > 0) {
        toast.success("🎉 Congratulations! Another book read.");
      } else {
        toast.success(
          "Well done! but you need to be a little bit faster. You can do it! 💪"
        );
      }

      setStartDate(null);
      setNumberOfPages("");
    } catch (error) {
      console.error(error);
      toast("🎉 Congratulations! Another book read. You can start new book!");
    }
  };

  return (
    <div className={css.wrap}>
      <h2 className={css.title}>RESULT</h2>
      <div className={css.inputContWrap}>
        <div className={css.inputCont}>
          <div className={css.inputWrap}>
            <label className={css.label}>Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="26.03.2025"
              dateFormat="dd/MM/yyyy"
              className={css.input}
              customInput={<input className={css.inputWithIcon} />}
            />
          </div>

          <div className={css.inputWrap}>
            <label className={css.label}>Amount of pages</label>
            <input
              className={css.input}
              type="number"
              value={numberOfPages}
              onChange={(e) => setNumberOfPages(e.target.value)}
              placeholder="32"
            />
          </div>
        </div>
        <button className={css.addBtn} onClick={handleAddPages}>
          Add result
        </button>
      </div>
      <div>
        <h2 className={css.titleStat}>STATISTICS</h2>
        <table cellPadding="8" style={{ margin: "20px auto", width: "100%" }}>
          <thead></thead>
          <tbody>
            {planning?.stats?.length > 0 ? (
              planning.stats.map((stat, index) => (
                <tr className={css.statistics} key={index}>
                  <td className={css.date}>
                    {new Date(stat.time).toLocaleDateString()}
                  </td>
                  <td className={css.hour}>
                    {new Date(stat.time).toLocaleTimeString()}
                  </td>
                  <td className={css.readPages}>
                    {stat.pagesCount} <span className={css.hour}>pages</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
