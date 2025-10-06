import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// Main Pages
import MainLayout from "../layouts/mainLayout/MainLayout";
import Home from "../pages/Home";
import Course from "../pages/Course";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";

// Dashboard Pages
import DashboardLayout from "../layouts/dashboardLayut/dashboardLayout";
import Dashboard from "../pages/Dashboard/Index";
import Profile from "../pages/Dashboard/Profile/Index";
import Learn from "../pages/Dashboard/Learn/Index";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            // Main Layout
            {
                path: "/",
                element: <MainLayout />,
                children: [
                    { path: "/", element: <Home /> },
                    { path: "course/:id", element: <Course /> },
                    { path: "login", element: <Login /> },
                    { path: "register", element: <Register /> },
                ],
            },
            // Dashboar Layout
            {
                path: "/dashboard",
                element: <DashboardLayout />,
                children: [
                    {
                        path: "",
                        element: <Dashboard />,
                    },
                    {
                        path: "learn/:id",
                        element: <Learn />,
                    },
                    {
                        path: "manage-profile",
                        element: <Profile />,
                    },
                ],
            },
        ],
    },
]);

export default router;
