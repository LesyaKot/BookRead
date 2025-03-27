import Countdown from "react-countdown";
import css from "./Timer.module.css"; 

export default function Timer({ targetDate }) {
 
  return (
    <Countdown
      date={targetDate}
      renderer={({ days, hours, minutes, seconds }) => (
        <div className={css.timer}>
          <div className={css.timeBlock}>
            <span className={css.value}>{days}</span>
            <span className={css.label}>DAYS</span>
          </div>
          <span className={css.separator}>:</span>

          <div className={css.timeBlock}>
            <span className={css.value}>{hours}</span>
            <span className={css.label}>HRS</span>
          </div>
          <span className={css.separator}>:</span>

          <div className={css.timeBlock}>
            <span className={css.value}>{minutes}</span>
            <span className={css.label}>MINS</span>
          </div>
          <span className={css.separator}>:</span>

          <div className={css.timeBlock}>
            <span className={css.value}>{seconds}</span>
            <span className={css.label}>SECS</span>
          </div>
        </div>
      )}
    />
  );
}


