import react from "react";
import { Button, Toaster } from "@/components"
import { LogOut } from "lucide-react"
import axios from "axios";
import { toast } from "sonner"

const LogoutBtn = () => {

    const logoutHandler = async () => {
        try {

            const { data } = await axios.get("http://localhost:3000/api/v1/user/logout", {
                withCredentials: true
            });

            toast.success(data.message);
            window.location.href = "/login";


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