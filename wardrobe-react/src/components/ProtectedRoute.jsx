import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function ProtectedRoute() {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <p>Checking authentication...</p>;
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />
}

export default ProtectedRoute;