import { Navigate } from "react-router-dom";
import { Loader } from "@/components";
import { useSelector } from "react-redux";

const RedirectIfAuthenticated = ({ children }) => {
  const user = useSelector((state) => state.global.user);
  const isLoggedIn = useSelector((state) => state.global.isLoggedIn);
  const isLoading = useSelector((state) => state.global.isLoading);

  if (isLoading) {
    return <Loader />;
  }

  return isLoggedIn ? <Navigate to="/" /> : children;
};

export default RedirectIfAuthenticated;
