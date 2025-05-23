import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const GuestLayout = () => {
  const { user, loading } = useUser();
  const token = localStorage.getItem("api_token");

  if (loading) return null; // aspetta il caricamento dell'utente

  if (user || token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestLayout;
