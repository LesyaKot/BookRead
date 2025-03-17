import annotationPlugin from "chartjs-plugin-annotation";
ChartJS.register(annotationPlugin);
import { useSelector } from "react-redux";
import { selectBooks, selectPlanning } from "../../redux/book/selectors";
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
import css from "./MyGoals.module.css";

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
  const planning = useSelector(selectPlanning);
  const books = useSelector(selectBooks);

  const currentlyReadingBooks = books.filter(
    (book) => book.status === "currentlyReading"
  );

  const amountOfBooks = currentlyReadingBooks.length;
  const amountOfPages = currentlyReadingBooks.reduce(
    (total, book) => total + book.pagesTotal,
    0
  );
  const amountOfDays = planning?.stats?.length || currentlyReadingBooks.length;
  const pagesPerDay = amountOfDays
    ? Math.round(amountOfPages / amountOfDays)
    : 0;

  const chartData = {
    labels: Array(
      planning?.stats?.length ?? currentlyReadingBooks.length ?? 0
    ).fill(""),
    datasets: [
      {
        label: "",
        data: planning?.pagesPerDay
          ? Array(
              planning?.stats?.length ?? currentlyReadingBooks.length ?? 0
            ).fill(planning.pagesPerDay)
          : Array(currentlyReadingBooks.length).fill(0),
        borderColor: "#242A37",
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.4,
      },
      {
        label: "",
        data:
          planning?.stats?.map((stat) => stat.pagesCount) ??
          currentlyReadingBooks.map((book) => book.pagesFinished),
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
            xValue: amountOfDays - 1,
            yValue: planning?.pagesPerDay || 0,
            content: "PLAN",
            color: "#242A37",
            font: {
              size: 14,
              weight: "bold",
            },
            xAdjust: -50,
            yAdjust: -10,
          },
          actLabel: {
            type: "label",
            xValue: amountOfDays - 1,
            yValue:
              planning?.stats?.slice(-1)[0]?.pagesCount ||
              currentlyReadingBooks.slice(-1)[0]?.pagesFinished ||
              0,
            content: "ACT",
            color: "#FF6B08",
            font: {
              size: 14,
              weight: "bold",
            },
            xAdjust: -60,
            yAdjust: -10,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          drawTicks: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          drawTicks: false,
          drawBorder: false,
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
                      <span className={css.accent}>Author: </span> {book.author}
                    </p>
                    <p className={css.text}>
                      <span className={css.accent}>Year: </span>{" "}
                      {book.publishYear}
                    </p>
                    <p className={css.text}>
                      <span className={css.accent}>Pages: </span>{" "}
                      {book.pagesTotal}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button className={css.btn}>Start training</button>

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
