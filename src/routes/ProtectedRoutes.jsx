import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useGetUserSession } from "../hooks/users/useGetUserSession";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

const ProtectedRoutes = ({ allowedRoles }) => {
  const location = useLocation();
  const { data , isLoading } = useGetUserSession();
  const user = data?.data.user;
  console.log("ProtectedRoutes user:", user);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/authentication/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;