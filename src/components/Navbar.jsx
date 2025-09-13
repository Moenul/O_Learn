import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { user } = useSelector((state) => state.user);

    return (
        <>
            <nav className="flex gap-2">
                <Link to="/">Home</Link>
                {user === null ? (
                    <>
                        <Link to="login">Login</Link>
                        <Link to="register">Register</Link>
                    </>
                ) : (
                    <Link to="dashboard">Dashboard</Link>
                )}
            </nav>
        </>
    );
};

export default Navbar;
