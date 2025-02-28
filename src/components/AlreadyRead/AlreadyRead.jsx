// import { useSelector } from "react-redux";
// import { selectBooks } from "../../redux/book/selectors";
// import BookItem from "../BookItem/BookItem";
// import css from "./AlreadyRead.module.css"

// export default function AlreadyRead(){

//     const books = useSelector(selectBooks);

    
//     const finishedBooks = books.filter(book => book.status === "finishedReading");
//     return(
//         <div>
//  <h2 className={css.sectionTitle}>Already read</h2>
//         <ul className={css.list}>
//           {finishedBooks.map(book => (
//             <BookItem key={book._id} book={book} />
//           ))}
//         </ul>
//         </div>
       
//     )
// }

