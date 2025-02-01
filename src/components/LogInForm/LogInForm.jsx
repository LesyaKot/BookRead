import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsAsterisk } from "react-icons/bs";
import GoogleLoginBtn from "../GoogleLoginBtn/GoogleLoginBtn";
import css from "./LogInForm.module.css";

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
    <div className={css.wrap}>
      <GoogleLoginBtn />

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
            Email
            <BsAsterisk />
            <Field className={css.input} type="email" name="email" />
            <ErrorMessage
              name="email"
              component="div"
              className={css.errorMessage}
            />
          </label>
          <label className={css.label}>
            Password
            <BsAsterisk />
            <Field className={css.input} type="password" name="password" />
            <ErrorMessage
              name="password"
              component="div"
              className={css.errorMessage}
            />
          </label>
          <button className={css.btn} type="submit">
            Log in
          </button>
        </Form>
      </Formik>
    </div>
  );
}
