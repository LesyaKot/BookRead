import annotationPlugin from "chartjs-plugin-annotation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { MdMenuBook } from "react-icons/md";
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
import { selectBooks } from "../../redux/book/selectors";
import {
  selectPlanning,
  selectPlanningEnded,
  selectIsLoading,
} from "../../redux/planning/selectors";
import { getPlanning } from "../../redux/planning/operations";
import css from "./MyGoals.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);
import Timer from "../Timer/Timer";

export default function MyGoals() {
  const dispatch = useDispatch();
  const planning = useSelector(selectPlanning);
  const planningEnded = useSelector(selectPlanningEnded);
  const isLoading = useSelector(selectIsLoading);
  const books = useSelector(selectBooks);
  const goalDate = planning?.endDate ? new Date(planning.endDate) : null;
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (
      isLoading ||
      planningEnded ||
      !planning ||
      Object.keys(planning).length > 0
    ) {
      return;
    }
    dispatch(getPlanning());
  }, [dispatch, isLoading, planning, planningEnded]);

  const currentlyReadingBooks = books.filter(
    (book) => book.status === "currentlyReading"
  );
  const finishedReadingBooks = books.filter(
    (book) => book.status === "finishedReading"
  );

  const amountOfBooks = currentlyReadingBooks.length;
  const amountOfPages = currentlyReadingBooks.reduce(
    (total, book) => total + book.pagesTotal,
    0
  );

  const amountOfBooksLeft = finishedReadingBooks.length;

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

  const plannedData = planning?.pagesPerDay
    ? Array(plannedDays).fill(planning.pagesPerDay)
    : [];
  const actualData = planning?.stats?.length
    ? planning.stats.map((stat) => stat.pagesCount)
    : [];

  const hasPlanning = planning && Object.keys(planning).length > 0;

  const chartData = {
    labels: hasPlanning
      ? Array(plannedDays)
          .fill("")
          .map((_, index) => `Day ${index + 1}`)
      : Array(5)
          .fill("")
          .map((_, index) => `Day ${index + 1}`),

    datasets: hasPlanning
      ? [
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
        ]
      : [
          {
            label: "Empty",
            data: Array(5).fill(null),
            borderColor: "transparent",
            pointRadius: 0,
            fill: false,
          },
        ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30,
        bottom: 30,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: hasPlanning
          ? `Amount of pages / DA ${pagesPerDay}`
          : "Amount of pages / DA 0",
        align: "start",
        color: "#091E3F",
        font: {
          size: 16,
        },
        padding: {
          top: 30,
          bottom: 50,
        },
      },
    },
    annotation: {
      annotations: {
        planPoint: {
          type: "point",
          xValue: 0,
          yValue: hasPlanning ? planning.pagesPerDay || 0 : 0,
          backgroundColor: "#091E3F",
          radius: 6,
          borderWidth: 0,
        },
        actPoint: {
          type: "point",
          xValue: 0,
          yValue: hasPlanning
            ? planning?.stats?.slice(-1)[0]?.pagesCount || 0
            : 0,
          backgroundColor: "#FF6B08",
          radius: 6,
          borderWidth: 0,
        },
        planLabel: {
          type: "label",
          xValue: 0,
          yValue: hasPlanning ? planning.pagesPerDay || 0 : 0,
          content: ["PLAN"],
          backgroundColor: "#F5F7FA",
          color: "#091E3F",
          font: {
            size: 12,
            weight: "bold",
          },
          xAdjust: 20,
          yAdjust: -10,
          padding: 6,
          cornerRadius: 4,
        },
        actLabel: {
          type: "label",
          xValue: 0,
          yValue: hasPlanning
            ? planning?.stats?.slice(-1)[0]?.pagesCount || 0
            : 0,
          content: ["ACT"],
          backgroundColor: "#F5F7FA",
          color: "#FF6B08",
          font: {
            size: 12,
            weight: "bold",
          },
          xAdjust: 20,
          yAdjust: -10,
          padding: 6,
          cornerRadius: 4,
        },
      },
    },

    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "TIME",
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#091E3F",
          align: "end",
          padding: { top: 10 },
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={css.wrap}>
      {amountOfBooks > 0 ? (
        <>
          <div className={css.timerWrap}>
            <div className={css.timerWrapItem}>
              <h2 className={css.titleTimer}>Years Countdown</h2>
              <Timer
                targetDate={
                  new Date(new Date().getFullYear(), 11, 31, 23, 59, 59)
                }
              />
            </div>

            <div className={css.timerWrapItem}>
              <h2 className={css.titleTimer}>Goals Countdown</h2>
              {goalDate ? (
                <Timer targetDate={goalDate} />
              ) : (
                <p>Goal has not been set yet</p>
              )}
            </div>
          </div>

          <div className={css.MyGoalsWrap}>
            <h2 className={css.title}>My Goals</h2>

            <div className={css.stats}>
              <div className={css.amountWrap}>
                <p className={css.amountTable}>{amountOfBooks}</p>
                <p className={css.amountText}>Amount of books</p>
              </div>
              <div className={css.amountWrap}>
                <p className={css.amountTable}>{amountOfDays}</p>
                <p className={css.amountText}>Amount of days</p>
              </div>

              <div className={css.amountWrap}>
                <p className={css.amountTable}>
                  <span className={css.accentBook}>{amountOfBooksLeft}</span>
                </p>
                <p className={css.amountText}>Books left</p>
              </div>
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
