import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Для валідації
import css from "./RegisterForm.module.css";

export default function RegisterForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  // Схема валідації з Yup
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
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema} // Додаємо валідацію
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Username
          <Field className={css.input} type="text" name="name" />
          <ErrorMessage
            name="name"
            component="div"
            className={css.errorMessage}
          />
        </label>
        <label className={css.label}>
          Email
          <Field className={css.input} type="email" name="email" />
          <ErrorMessage
            name="email"
            component="div"
            className={css.errorMessage}
          />
        </label>
        <label className={css.label}>
          Password
          <Field className={css.input} type="password" name="password" />
          <ErrorMessage
            name="password"
            component="div"
            className={css.errorMessage}
          />
        </label>
        <label className={css.label}>
          Confirm password
          <Field
            className={css.input}
            type="password"
            name="confirmPassword"
          />
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className={css.errorMessage}
          />
        </label>
        <button className={css.btn} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
}
