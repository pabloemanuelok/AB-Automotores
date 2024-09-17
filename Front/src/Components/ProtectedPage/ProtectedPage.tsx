"use client"

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/Context/contextUser";
import { useRouter } from "next/navigation";

const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLogged } = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Solo ejecuta en el cliente
      if (!isLogged) {
        router.push("/"); // Redirige al home si el usuario no está autenticado
      }
      setLoading(false);
    }
  }, [isLogged, router]);

  if (loading) {
    return <p>Loading...</p>; // O puedes mostrar un loader o pantalla de carga mientras se redirige
  }

  if (!isLogged) {
    return null; // O puedes mostrar una página de acceso denegado o redirigir
  }

  return <>{children}</>;
};

export default ProtectedPage;
