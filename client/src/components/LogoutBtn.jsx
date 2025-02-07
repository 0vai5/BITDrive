import react from "react";
import { Button, Toaster } from "@/components"
import { LogOut } from "lucide-react"
import axios from "axios";
import { toast } from "sonner"

const LogoutBtn = () => {

    const logoutHandler = async () => {
        try {

            const { data } = await axios.get("https://localhost:3000/api/v1/user/logout", {
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
            <Button><LogOut /> Logout</Button>
        </>
    )
};

export default LogoutBtn;