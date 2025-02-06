import { MdMenuBook } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import PropTypes from "prop-types";
import css from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";

const getFirstName = (fullName) => (fullName ? fullName.split(" ")[0] : "User");

export default function Header({ onIconClick }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <>
      <div className={css.wrap}>
        <Logo />

        <nav className={css.nav}>
          <NavLink className={css.link} to="/library">
            <div className={css.iconBookWrap}>
              <MdMenuBook className={css.iconHome} onClick={onIconClick} width={22} height={17} />
            </div>
            
          </NavLink>

          <NavLink className={css.link} to="/">
            <div className={css.iconHomeWrap}>
              <IoHomeOutline className={css.iconBook} width={22} height={17} />
            </div>
          </NavLink>
        </nav>

        <div className={css.nameWrap}>
          {user?.name ? (
            <>
              <div className={css.firstLetterWrap}>
                <p className={css.firstLetterWrap}>
                  {user.name.charAt(0).toUpperCase()}
                </p>
              </div>

              <p className={css.userName}>{getFirstName(user.name)}</p>
            </>
          ) : (
            <h3>No name</h3>
          )}
          <button className={css.logoutBtn} onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  onIconClick: PropTypes.func.isRequired,
};