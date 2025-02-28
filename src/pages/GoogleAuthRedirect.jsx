import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { googleLogin } from "../redux/auth/operations";

export default function GoogleAuthRedirect () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");
    const sid = urlParams.get("sid");

    if (accessToken && refreshToken && sid) {
      dispatch(googleLogin({ accessToken, refreshToken, sid }));

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("sid", sid);

      navigate("/user/books");
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return <div><h2>Завантаження...</h2></div>;
};

