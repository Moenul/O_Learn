import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../features/auth/userSlice";

export default function useAuth() {
    const dispatch = useDispatch();
    const { user, token, loading } = useSelector((state) => state.user);

    const signIn = (email, password) => dispatch(login({ email, password }));
    const signOut = () => dispatch(logout());

    return {
        user,
        token,
        loading,
        signIn,
        signOut,
        isAuthenticated: !!token,
    };
}
