import Timer from "../Timer/Timer";

export default function TimerModal({ onClose, goalDate }) {
  console.log("Received goalDate in TimerModal:", goalDate);
  return (
    <div className="modal">
      <h2>Years Countdown</h2>
      <Timer
        targetDate={new Date(new Date().getFullYear(), 11, 31, 23, 59, 59)}
      />

      <h2>Goals Countdown</h2>
      {goalDate ? (
        <Timer targetDate={goalDate} />
      ) : (
        <p>Goal has not been set yet</p>
      )}

      <button onClick={onClose}>Close</button>
    </div>
  );
}
