import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import css from "./AuthNav.module.css";

const getFirstName = (fullName) => (fullName ? fullName.split(" ")[0] : "User");

export default function AuthNav() {
  const loggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.wrap}>
      {!loggedIn ? (
        <>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            Log in
          </NavLink>
        </>
      ) : (
        <div>
          {user?.name ? (
            <>
              <div>{user.name.charAt(0).toUpperCase()}</div>
              <h3>{getFirstName(user.name)}</h3>
            </>
          ) : (
            <h3>No name</h3>
          )}
          <button className={css.logoutBtn} onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
