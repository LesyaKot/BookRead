import Timer from "../Timer/Timer";
import css from "./TimerModal.module.css";

export default function TimerModal({ onClose, goalDate }) {
  return (
    <div className="modal">
      <h2 className={css.title}>Years Countdown</h2>
      <Timer
        targetDate={new Date(new Date().getFullYear(), 11, 31, 23, 59, 59)}
      />

      <h2 className={css.title}>Goals Countdown</h2>
      {goalDate ? (
        <Timer targetDate={goalDate} />
      ) : (
        <p>Goal has not been set yet</p>
      )}

      <button className={css.btn} onClick={onClose}>
        Close
      </button>
    </div>
  );
}
