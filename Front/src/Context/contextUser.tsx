"use client";
import { IUserContextType, ILogin, IUser } from "@/Interfaces/Interface";
import { postLogin } from "@/utils/FetchUsers/FetchUsers";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  login: async () => false,
  logout: () => {}, // Función de logout inicializada
  token: null,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Partial<IUser> | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState<string | null>(null);

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
    setToken(null); // Eliminar el token del estado
    setIsLogged(false); // Cambiar el estado de sesión
    setUser(null); // Restablecer el usuario
    localStorage.removeItem("token"); // Eliminar el token de localStorage
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLogged(true);
      setToken(storedToken);
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
        logout, // Agregar la función logout al valor del contexto
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
