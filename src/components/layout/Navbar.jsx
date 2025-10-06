import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { isAuthenticated, signOut } = useAuth();

    return (
        <>
            <nav className="w-full fixed top-0 px-4 py-4 bg-white/80 backdrop-blur border border-slate-300">
                <div className="px-4 max-w-6xl mx-auto flex gap-2 ">
                    <Link to="/">Home</Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            <button onClick={signOut}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
