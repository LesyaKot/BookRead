import { NavLink } from "react-router-dom";
import { useAuth } from "../../redux/auth/selectors";
import css from "./Navigation.module.css";

export default function Navigation() {
  const { isLoggedIn } = useAuth();

  return (
    <nav className={css.nav}>
      <NavLink className={css.link} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={css.link} to="/books">
          Library
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink className={css.link} to="/training">
          Training
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink className={css.link} to="/statistics">
          Statistics
        </NavLink>
      )}
    </nav>
  );
}
