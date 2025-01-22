import { Navigate } from "react-router-dom";
import { useAuth } from "../src/redux/auth/selectors";

export default function RestrictedRoute({
  component: component,
  redirectTo = "/",
}) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
}