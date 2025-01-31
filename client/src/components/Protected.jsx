import react, { useEffect, useState } from 'react';
import axios from 'axios'
import { Navigate } from "react-router-dom"

const Protected = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, status } = await axios.get("http://localhost:3000/api/v1/user/getCurrentUser", {
                    withCredentials: true
                });

                if (status === 200) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default Protected;