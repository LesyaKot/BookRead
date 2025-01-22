import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.wrap}>
      <p className={css.user}>{user.name}</p>
      <button className={css.btn} type="button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}