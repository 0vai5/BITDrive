import { Navigate } from "react-router-dom";
import { Loader } from "@/components";
import { useSelector } from "react-redux";

const Protected = ({ children }) => {
  const user = useSelector((state) => state.global.user);
  const isLoggedIn = useSelector((state) => state.global.isLoggedIn);
  const isLoading = useSelector((state) => state.global.isLoading);


  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default Protected;
