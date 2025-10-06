import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const DashboardLayout = () => {
    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default DashboardLayout;
