import react from "react";
import { Button, Toaster } from "@/components";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetGlobalState } from "@/features/global/globalSlice";
import Cookies from "js-cookie";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      Cookies.remove("token");
      dispatch(resetGlobalState());

      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full flex justify-center items-center p-1">
        <Button
          size="lg"
          className="bg-red-500 hover:bg-red-600 text-white w-full"
          onClick={logoutHandler}
        >
          <LogOut /> Logout
        </Button>
      </div>
    </>
  );
};

export default LogoutBtn;
