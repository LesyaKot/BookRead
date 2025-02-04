import { MdMenuBook } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import AuthNav from "../AuthNav/AuthNav";
import css from "./Header.module.css";

export default function Header() {
  return (
    <>
      <Logo />

      <nav className={css.nav}>
        <NavLink className={css.link} to="/">
          <IoHomeOutline />
        </NavLink>
        <NavLink className={css.link} to="/library">
          <MdMenuBook />
        </NavLink>
      </nav>

      <AuthNav />
    </>
  );
}
