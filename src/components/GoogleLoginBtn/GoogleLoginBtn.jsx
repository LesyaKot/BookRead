// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { googleLogin } from "../../redux/auth/operations";
// import { GOOGLE_CLIENT_ID } from "../../../config";

// export default function GoogleLoginBtn() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
   
//     if (!window.google || !window.google.accounts) {
//       console.error("Google API script is not loaded");
//       return;
//     }
   
//     window.google.accounts.id.initialize({
//       client_id: GOOGLE_CLIENT_ID,
//       callback: handleCredentialResponse,
//     });
   
//     window.google.accounts.id.renderButton(
//       document.getElementById("google-login-btn"),
//       { theme: "outline", size: "large" }
//     );
//   }, []);

//   const handleCredentialResponse = async (response) => {
//     console.log("JWT Token:", response.credential);
//     try {
//       const result = await dispatch(googleLogin(response.credential)).unwrap();
//       console.log("Login success:", result);
//       navigate("https://bookread-backend.goit.global/user/books");
//     } catch (error) {
//       console.error("Google Login Error:", error.message);
//     }
//   };  

//   return <div id="google-login-btn"></div>;
// }


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GOOGLE_CLIENT_ID } from "../../../config";

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

  return <div id="google-login-btn"></div>;
}

