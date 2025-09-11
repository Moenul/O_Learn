import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav className="flex gap-2">
                <Link to="/">Home</Link>
                <Link to="course/2">Course</Link>
                <Link to="login">Login</Link>
                <Link to="register">Register</Link>
                <Link to="dashboard">Dashboard</Link>
            </nav>
        </>
    );
};

export default Navbar;
