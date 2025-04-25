import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { BsAsterisk } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import "react-toastify/dist/ReactToastify.css";
import css from "./RegisterForm.module.css";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    console.log("handleSubmit with:", values);
    const userData = { ...values };
    delete userData.confirmPassword;

    try {
      const result = await dispatch(register(userData)).unwrap();
      console.log("✅ Registered user:", result);

      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      toast.success(`${result.userData.name} you are successfully registered!`);
      setTimeout(() => {
        navigate("/books");
      }, 2000);

      actions.resetForm();
    } catch (error) {
      console.error("❌ Register error:", error);
      toast.error("Can't register, please try again.");
    }
  };

  return (
    <>
      <div className={css.loginWrape}>
        <div className={css.logoWrap}>
          <Logo />
        </div>
        <div className={css.wrap}>
          
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
           
            }}
            onSubmit={handleSubmit}
          >
            <Form className={css.form} autoComplete="off">
              <label className={css.label}>
                <span className={css.labelText}>
                  Name <BsAsterisk className={css.icon} />
                </span>
                <Field
                  className={css.input}
                  type="text"
                  name="name"
                  placeholder="name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.errorMessage}
                />
              </label>

              <label className={css.label}>
                <span className={css.labelText}>
                  Email <BsAsterisk className={css.icon} />
                </span>
                <Field
                  className={css.input}
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.errorMessage}
                />
              </label>

              <label className={css.label}>
                <span className={css.labelText}>
                  Password <BsAsterisk className={css.icon} />
                </span>
                <Field
                  className={css.input}
                  type="password"
                  name="password"
                  placeholder="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.errorMessage}
                />
              </label>

              
              <button className={css.btn} type="submit">
                Register
              </button>

              <div className={css.linkWrap}>
                <Link className={css.link} to="/login">
                  Already have an account?{" "}
                  <span className={css.accent}>Log in</span>
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
