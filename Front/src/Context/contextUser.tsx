"use client";
import { IUserContextType, ILogin, IUser } from "@/Interfaces/Interface";
import { postLogin } from "@/utils/FetchUsers/FetchUsers";
import { isTokenExpired } from "@/utils/Auth/Auth";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  login: async () => false,
  logout: () => {},
  token: null,
  sessionExpired: false,
  handleSessionExpired: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Partial<IUser> | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);

  const login = async (credentials: ILogin) => {
    try {
      const data = await postLogin(credentials);
      setToken(data.access_token); // Almacenar el token
      setIsLogged(true);
      localStorage.setItem("token", data.access_token); // Guardar el token en localStorage
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setIsLogged(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  const handleSessionExpired = () => {
    setSessionExpired(true);
    setToken(null);
    setIsLogged(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      if (isTokenExpired(storedToken)) {
        handleSessionExpired();
      } else {
        setIsLogged(true);
        setToken(storedToken);
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        login,
        logout,
        token,
        sessionExpired,
        handleSessionExpired,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
