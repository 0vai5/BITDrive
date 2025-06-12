import react from "react";
import { Button, Toaster } from "@/components"
import { LogOut } from "lucide-react"
import axios from "axios";
import { toast } from "sonner"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetGlobalState } from "@/features/global/globalSlice";

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {

            const { data } = await axios.get("http://localhost:3000/api/v1/user/logout", {
                withCredentials: true
            });

            toast.success(data.message);

            dispatch(resetGlobalState());


            navigate("/login");


        } catch (error) {
            toast.error(error.message)
        }
    };


    return (
        <>
            <Toaster />
            <div className="w-full flex justify-center items-center">
                <Button size="lg" onClick={logoutHandler}><LogOut /> Logout</Button>
            </div>
            
        </>
    )
};

export default LogoutBtn;