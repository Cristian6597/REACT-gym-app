import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const ProtectedLayout = () => {
  const { user, loading } = useUser();
  const token = localStorage.getItem("api_token");

  // Se sto ancora caricando i dati dell'utente, non renderizzo nulla (o metti uno spinner)
  if (loading) return null;

  // Se non c'è utente o token, reindirizzo al login
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="protected-layout">
      {/* Puoi aggiungere un header o nav qui se vuoi */}
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
