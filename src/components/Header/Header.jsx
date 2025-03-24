import UserMenu from "../UserMenu/UserMenu";
import { MdMenuBook } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { IoFitnessOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import "react-toastify/dist/ReactToastify.css";
import css from "./Header.module.css";


export default function Header({ onIconClick }) {
  const user = useSelector(selectUser);

  const getFirstName = (fullName) =>
    fullName ? fullName.split(" ")[0] : "User";
  return (
    <div className={css.wrap}>
      <Logo />

      <nav className={css.nav}>
        <NavLink className={css.link} to="/books">
          <div className={css.iconBookWrap}>
            <MdMenuBook
              className={css.iconHome}
              onClick={onIconClick}
              width={22}
              height={17}
            />
          </div>
        </NavLink>

        <NavLink className={css.link} to="/">
          <div className={css.iconHomeWrap}>
            <IoHomeOutline className={css.iconBook} width={22} height={17} />
          </div>
        </NavLink>

        <NavLink
          to="/planning"
          className={({ isActive }) => (isActive ? css.active : css.link)}
        >
          <div className={css.iconHomeWrap}>
            <IoFitnessOutline className={css.iconBook} width={22} height={17} />
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

        <UserMenu />
      </div>
    </div>
  );
}

Header.propTypes = {
  onIconClick: PropTypes.func.isRequired,
};
