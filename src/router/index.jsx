import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Course from "../pages/Course";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
            { path: "course/:id", element: <Course /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "dashboard", element: <Dashboard /> },
        ],
    },
]);

export default router;
