import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegisterForm.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            Name
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

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}
