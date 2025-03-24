import annotationPlugin from "chartjs-plugin-annotation";
ChartJS.register(annotationPlugin);
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectBooks } from "../../redux/book/selectors";
import {
  selectPlanning,
  selectPlanningEnded,
  selectIsLoading,
} from "../../redux/planning/selectors";
import { Line } from "react-chartjs-2";
import { MdMenuBook } from "react-icons/md";
import TimerModal from "../TimerModal/TimerModal";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import css from "./MyGoals.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPlanning } from "../../redux/planning/operations";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MyGoals() {
  const dispatch = useDispatch();

  const planningEnded = useSelector(selectPlanningEnded);
  const planning = useSelector(selectPlanning);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (isLoading || planningEnded || Object.keys(planning || {}).length > 0)
      return;

    dispatch(getPlanning());
  }, [dispatch, isLoading, planning, planningEnded]);

  const books = useSelector(selectBooks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentlyReadingBooks = books.filter(
    (book) => book.status === "currentlyReading"
  );

  const amountOfBooks = currentlyReadingBooks.length;
  const amountOfPages = currentlyReadingBooks.reduce(
    (total, book) => total + book.pagesTotal,
    0
  );

  const startDate = planning?.startDate ? new Date(planning.startDate) : null;
  const endDate = planning?.endDate ? new Date(planning.endDate) : null;

  const plannedDays =
    startDate && endDate
      ? Math.max(
          1,
          Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1
        )
      : currentlyReadingBooks.length;

  const amountOfDays = plannedDays * currentlyReadingBooks.length;
  const pagesPerDay = amountOfDays
    ? Math.round(amountOfPages / amountOfDays)
    : 0;

  console.log("Planned Pages per Day:", planning?.pagesPerDay);
  console.log(
    "Actual Pages per Day:",
    planning?.stats?.map((stat) => stat.pagesCount)
  );

  const plannedData = planning?.pagesPerDay
    ? Array(plannedDays).fill(planning.pagesPerDay)
    : [];
  const actualData = planning?.stats?.length
    ? planning.stats.map((stat) => stat.pagesCount)
    : [];

  const chartData = {
    labels: Array(plannedDays)
      .fill("")
      .map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: "Planned",
        data: plannedData,
        borderColor: "#242A37",
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.4,
      },
      {
        label: "Actual",
        data: actualData,
        borderColor: "#FF6B08",
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Amount of pages / DA ${pagesPerDay}`,
        align: "start",
        font: {
          size: 16,
        },
      },
      annotation: {
        annotations: {
          planLabel: {
            type: "label",
            xValue: plannedDays - 1,
            yValue: planning?.pagesPerDay || 0,
            content: "PLAN",
            color: "#242A37",
            font: {
              size: 14,
              weight: "bold",
            },
            xAdjust: -30,
            yAdjust: 20,
          },
          actLabel: {
            type: "label",
            xValue: planning?.stats?.length - 1 || 0,
            yValue: planning?.stats?.slice(-1)[0]?.pagesCount || 0,
            content: "ACT",
            color: "#FF6B08",
            font: {
              size: 14,
              weight: "bold",
            },
            xAdjust: 10,
            yAdjust: 15,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={css.wrap}>
      <h2 className={css.title}>My Goals</h2>

      {amountOfBooks > 0 ? (
        <>
          <div className={css.stats}>
            <div className={css.amountWrap}>
              <p className={css.amountTable}>{amountOfBooks}</p>
              <p className={css.amountText}>Amount of books</p>
            </div>
            <div className={css.amountWrap}>
              <p className={css.amountTable}>{amountOfDays}</p>
              <p className={css.amountText}>Amount of days</p>
            </div>
          </div>

          <div className={css.currentlyReading}>
            <ul className={css.list}>
              {currentlyReadingBooks.map((book) => (
                <li key={book._id} className={css.listItem}>
                  <div className={css.titleWrap}>
                    <MdMenuBook className={css.icon} />
                    <p className={css.text}>{book.title}</p>
                  </div>
                  <div className={css.textWrap}>
                    <p className={css.text}>
                      <span className={css.accent}>Author:</span> {book.author}
                    </p>
                    <p className={css.text}>
                      <span className={css.accent}>Year:</span>{" "}
                      {book.publishYear}
                    </p>
                    <p className={css.text}>
                      <span className={css.accent}>Pages:</span>{" "}
                      {book.pagesTotal}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={css.timerWrap}>
            <button onClick={() => setIsModalOpen(true)}>Start training</button>
            {isModalOpen && (
              <TimerModal
                onClose={() => setIsModalOpen(false)}
                goalDate={endDate}
              />
            )}
          </div>

          <div className={css.chart}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </>
      ) : (
        <p>No books are currently being read.</p>
      )}
    </div>
  );
}
