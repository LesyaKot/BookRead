import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegisterForm.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleLoginBtn from "../GoogleLoginBtn/GoogleLoginBtn";
import { BsAsterisk } from "react-icons/bs";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    const userData = { ...values };
    delete userData.confirmPassword;

    try {
      const result = await dispatch(register(userData)).unwrap();
      toast.success(`Користувач ${result.user.name} успішно зареєстрований!`);
      actions.resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Не вдалося зареєструвати користувача. Спробуйте ще раз.");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Ім'я повинно містити щонайменше 2 символи")
      .required("Ім'я є обов'язковим"),
    email: Yup.string()
      .email("Невірний формат електронної пошти")
      .required("Електронна пошта є обов'язковою"),
    password: Yup.string()
      .min(6, "Пароль повинен містити щонайменше 6 символів")
      .required("Пароль є обов'язковим"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Паролі не співпадають")
      .required("Підтвердження пароля є обов'язковим"),
  });

  return (
    <>
      <div className={css.loginWrape}>
        <div className={css.logoWrap}>
          <Logo />
        </div>
        <div className={css.wrap}>
          <GoogleLoginBtn />

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
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

          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      </div>
    </>
  );
}
