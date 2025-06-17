import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserProvider";

export function ProtectedClientRoute() {
  const { user } = useUser();

  if (user.role !== "client") {
    return <Navigate to="/" replace />; // o pagina "accesso negato"
  }

  return <Outlet />;
}
