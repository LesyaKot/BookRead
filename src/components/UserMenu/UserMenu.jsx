import { useDispatch } from "react-redux";
import { useState } from "react";
import { logOut } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const result = await dispatch(logOut());

    console.log("Logout result:", result);

    if (logOut.fulfilled.match(result)) {
      toast.success("You have been logged out successfully!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } else {
      toast.error("Logout failed. Please try again.");
    }

    setIsModalOpen(false);
  };

  return (
    <>
      <button className={css.logoutBtn} onClick={handleOpenModal}>
        Log out
      </button>

      {isModalOpen && (
        <div className={css.backdrop} onClick={handleCloseModal}>
          <div className={css.modal} onClick={(e) => e.stopPropagation()}>
            <p className={css.text}>
              The changes you made will be lost if you navigate away from this
              application
            </p>
            <div className={css.buttonContainer}>
              <button className={css.btn} onClick={handleLogout}>
                Leave
              </button>
              <button className={css.btn} onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
