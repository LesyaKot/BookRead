import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header/Header";
import { closeModal, openModal } from "../redux/modal/slice.js";
import { selectModal } from "../redux/modal/selectors.js";
import Modal from "../components/Modal/Modal";
import { fetchBooks } from "../redux/book/operations.js";

import { selectBooks, selectBooksLoading } from "../redux/book/selectors.js";

export default function Library() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectModal);
  const books = useSelector(selectBooks);
  const isLoading = useSelector(selectBooksLoading);
  

  useEffect(() => {
    dispatch(openModal());
  }, [dispatch]);

  const handleOpenModal = () => {
    console.log("Opening modal");
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    dispatch(closeModal());
  };
  useEffect(() => {
    dispatch(fetchBooks()); 
  }, [dispatch]);
  return (
    <>
      <Header onIconClick={handleOpenModal} />
      <div>
        <Modal isOpen={isOpen} onClose={handleCloseModal} />
      </div>

      {Array.isArray(books) && books.length > 0 ? (
  <ul>
    {books.map((book) => (
      <li key={book._id}>{book.title}</li>
    ))}
  </ul>
) : (
  !isLoading && <p>No books found.</p>
)}

    </>
  );
}
