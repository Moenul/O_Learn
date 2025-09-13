import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { isAuthenticated, signOut } = useAuth();

    return (
        <>
            <nav className="flex gap-2">
                <Link to="/">Home</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="dashboard">Dashboard</Link>
                        <button onClick={signOut}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="login">Login</Link>
                        <Link to="register">Register</Link>
                    </>
                )}
            </nav>
        </>
    );
};

export default Navbar;
