// import Header from "../components/Header/Header";
// import { closeModal, openModal } from "../redux/modal/slice.js";
// import { selectModal } from "../redux/modal/selectors.js";
// import Modal from "../components/Modal/Modal";
// import { useSelector, useDispatch } from "react-redux";

// export default function Library() {
//   const isOpen = useSelector(selectModal);
//   const dispatch = useDispatch();

//   const handleOpenModal = () => {
//     console.log('Opening modal:'); 
   
//     dispatch(openModal());
//   };

//   const handleCloseModal = () => {
//     console.log('Closing modal');
//     dispatch(closeModal());
//   };


//   return (
//     <>
//       <Header onClick={handleOpenModal}/>
//       <div>
//       <Modal
//             isOpen={isOpen}
//             onClose={handleCloseModal}            
//           />
//       </div>

//     </>
//   );
// }

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header/Header";
import { closeModal, openModal } from "../redux/modal/slice.js";
import { selectModal } from "../redux/modal/selectors.js";
import Modal from "../components/Modal/Modal";

export default function Library() {
  const isOpen = useSelector(selectModal);
  const dispatch = useDispatch();

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
      <div>
        <Modal isOpen={isOpen} onClose={handleCloseModal} />
      </div>
    </>
  );
}
