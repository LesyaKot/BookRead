import "./App.css";

import { useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";
import { refreshUser } from "../src/redux/auth/operations";
import { useAuth } from "../src/redux/auth/selectors";
import GoogleAuthRedirect from "./pages/GoogleAuthRedirect";

const HomePage = lazy(() => import("../src/pages/Home"));
const RegisterPage = lazy(() => import("../src/pages/Register"));
const LoginPage = lazy(() => import("../src/pages/Login"));
const LibraryPage = lazy(() => import("../src/pages/Library"));
// const StatisticsPage= lazy(()=> import("../src/pages/Statistics"));
// const TrainingPage = lazy(() => import("../src/pages/Training"));

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user please wait...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/google" element={<GoogleAuthRedirect />} />
        
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/library"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/library" component={<LoginPage />} />
          }
        />
        <Route
          path="/library"
          element={
            <>
              <PrivateRoute redirectTo="/login" component={<LibraryPage />} />
            </>
          }
        />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
