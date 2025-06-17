import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserProvider";
export function ProtectedTrainerRoute() {
  const { user } = useUser();

  if (user.role !== "trainer") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
