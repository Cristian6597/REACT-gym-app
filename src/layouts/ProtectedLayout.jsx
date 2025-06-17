import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const ProtectedLayout = () => {
  const { user, loading } = useUser();
  const token = localStorage.getItem("api_token");
  const location = useLocation();

  if (loading) return null;

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Redirect logica:
  if (user.role === "trainer" && location.pathname === "/") {
    return <Navigate to="/trainer-main" replace />;
  }
  if (user.role === "client" && location.pathname === "/trainer-main") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="protected-layout">
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
