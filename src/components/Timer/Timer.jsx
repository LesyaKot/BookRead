import Countdown from "react-countdown";

export default function Timer ({ targetDate })  {
    console.log("⏳ Timer received targetDate:", targetDate);

  return (
    <Countdown
      date={targetDate}
      renderer={({ days, hours, minutes, seconds }) => (
        <div>
          {days}D {hours}H {minutes}M {seconds}S
        </div>
      )}
    />
  );
};


