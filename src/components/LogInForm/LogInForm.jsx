import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsAsterisk } from "react-icons/bs";
import css from "./LogInForm.module.css";
import { FaQuoteLeft } from "react-icons/fa";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

export default function LogInForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    actions.resetForm();
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Невірний формат електронної пошти")
      .required("Електронна пошта є обов'язковою"),
    password: Yup.string()
      .min(6, "Пароль повинен містити щонайменше 6 символів")
      .required("Пароль є обов'язковим"),
  });

  return (
    <div className={css.loginWrape}>
      <div className={css.logoWrap}>
        <Logo />
      </div>
      <div className={css.wrap}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form} autoComplete="off">
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
              Log in
            </button>

            <div className={css.linkWrap}>
              <Link className={css.link} to="/register">
                <span className={css.accent}>Register</span>
              </Link>
            </div>
          </Form>
        </Formik>

       
      </div>
      <div className={css.textWrap}>
          <FaQuoteLeft className={css.icon} />
          <h3 className={css.textTitle}>
            Books are the ships of thoughts, wandering through the waves of
            time.
          </h3>
          <p className={css.text}>Francis Bacon</p>
        </div>
    </div>
  );
}
