import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header/Header";
import { closeModal, openModal } from "../redux/modal/slice.js";
import { selectModal } from "../redux/modal/selectors.js";
import Modal from "../components/Modal/Modal.jsx";
import GoingToRead from "../components/GoingToRead/GoingToRead.jsx";
// import AlreadyRead from "../components/AlreadyRead/AlreadyRead.jsx";
import CurrentlyReading from "../components/CurrentlyReading/CurrentlyReading.jsx";


export default function Library() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectModal);

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

  return (
    <>
      <Header onIconClick={handleOpenModal} />
      <Modal isOpen={isOpen} onClose={handleCloseModal} />
      <GoingToRead />
      <CurrentlyReading />
      {/* <AlreadyRead /> */}
    </>
  );
}
