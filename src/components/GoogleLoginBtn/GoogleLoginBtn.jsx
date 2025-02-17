import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GOOGLE_CLIENT_ID } from "../../../config";
import css from "./GoogleLoginBtn.module.css";

export default function GoogleLoginBtn() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCredentialResponse = (response) => {
      console.log("Google Credential:", response.credential);
      navigate("/user/books");
    };

    if (!window.google || !window.google.accounts) {
      console.error("Google API script is not loaded");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-login-btn"),
      { theme: "outline", size: "large" }
    );
  }, [navigate]);

  return (
    <div className={css.googleWrap}>
      <div className={css.googleBtn} id="google-login-btn"></div>
    </div>
  );
}
