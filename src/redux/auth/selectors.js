export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

// export const selectUser = (state) => state.auth.user;
export const selectUser = (state) => {
  return state.auth.user;
};

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

import { useSelector } from "react-redux";

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);

  return {
    isLoggedIn,
    isRefreshing,
    user,
  };
};
