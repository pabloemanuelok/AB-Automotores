"use client";
import { IUserContextType, ILogin, IUser } from "@/Interfaces/Interface";
import { postLogin } from "@/utils/FetchUsers/FetchUsers";
import { isTokenExpired, getUserFromToken } from "@/utils/Auth/Auth";
import { API_URL } from "@/utils/apiClient";
import { createContext, useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  login: async () => false,
  logout: () => {},
  token: null,
  setToken: () => {},
  sessionExpired: false,
  handleSessionExpired: () => {},
  authReady: false,
  socket: null,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Partial<IUser> | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  // Los guards no deben decidir antes de releer el token de localStorage.
  const [authReady, setAuthReady] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  const login = async (credentials: ILogin) => {
    try {
      const data = await postLogin(credentials);
      setToken(data.access_token); // Almacenar el token
      setIsLogged(true);
      setUser(getUserFromToken(data.access_token));
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

  const handleSessionExpired = useCallback(() => {
    setSessionExpired(true);
    setToken(null);
    setIsLogged(false);
    setUser(null);
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      if (isTokenExpired(storedToken)) {
        handleSessionExpired();
      } else {
        setIsLogged(true);
        setToken(storedToken);
        setUser(getUserFromToken(storedToken));
      }
    }
    setAuthReady(true);
  }, [handleSessionExpired]);

  // Conexión centralizada al namespace /tasks: se abre una sola vez por sesión
  // (no por cada tab del panel admin) y se cierra sola al deslogear o expirar.
  useEffect(() => {
    if (!authReady || !isLogged || !token) {
      setSocket(null);
      return;
    }

    const instance = io(`${API_URL}/tasks`, {
      auth: { token },
      transports: ["websocket"],
    });
    setSocket(instance);

    return () => {
      instance.disconnect();
    };
  }, [authReady, isLogged, token]);

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
        setToken,
        sessionExpired,
        handleSessionExpired,
        authReady,
        socket,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
