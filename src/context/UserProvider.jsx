import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "./AxiosProvider";

const userContext = createContext({
  user: undefined,
  handleLogin: (data) => null,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const myaxios = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("api_token");
      if (!token) {
        setUser(undefined);
        setLoading(false);
        return;
      }
      try {
        const response = await myaxios.get("/api/auth/user");
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem("api_token");
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = async (data) => {
    try {
      const result = await myaxios.post("/api/auth/login", data);
      localStorage.setItem("api_token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      setUser(result.data.user);
      navigate("/");
      return null;
    } catch (error) {
      return error.response?.data?.message || "Errore durante il login";
    }
  };

  return (
    <userContext.Provider value={{ handleLogin, user, loading }}>
      {!loading && children}
    </userContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(userContext);
