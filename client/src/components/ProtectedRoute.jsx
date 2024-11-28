import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const adminRoutes = [
    "/panel-admin",
    "/admin-users",
    "/admin-recipes",
    "/admin-comments",
  ];

  if (adminRoutes.includes(location.pathname) && user.role !== "admin") {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
