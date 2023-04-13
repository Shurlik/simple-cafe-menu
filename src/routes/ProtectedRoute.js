import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, redirectPath, token }) => {
    const location = useLocation();
    if (!token) {
        return <Navigate to={redirectPath} replace state={{ from: location }} />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
