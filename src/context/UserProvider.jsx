import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "./AxiosProvider";

const userContext = createContext({
  user: undefined,
  handleLogin: (data) => null,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const myaxios = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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
      console.log(error);
      return error.response?.data?.message || "Errore durante il login";
    }
  };

  return (
    <userContext.Provider value={{ handleLogin, user }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(userContext);
