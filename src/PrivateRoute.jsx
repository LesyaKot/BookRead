import { Navigate } from "react-router-dom";
import { useAuth } from "../src/redux/auth/selectors";

export default function PrivateRoute({
  component: component,
  redirectTo = "/",
}) {
  const { isLoggedIn, isRefreshing } = useAuth();
  const redirect = !isLoggedIn && !isRefreshing;

  return redirect ? <Navigate to={redirectTo} /> : component;
}