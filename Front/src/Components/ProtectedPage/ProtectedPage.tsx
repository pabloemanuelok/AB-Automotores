"use client"

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/Context/contextUser";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLogged, sessionExpired } = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionExpired) {
        Swal.fire({
          title: "Sesión expirada",
          text: "Tu sesión ha vencido. Por favor, iniciá sesión nuevamente.",
          icon: "warning",
          confirmButtonText: "Ir al login",
          confirmButtonColor: "#B62E30",
        }).then(() => {
          router.push("/views/login");
        });
        return;
      }
      if (!isLogged) {
        router.push("/");
      }
      setLoading(false);
    }
  }, [isLogged, sessionExpired, router]);

  if (loading) {
    return <p>Loading...</p>; // O puedes mostrar un loader o pantalla de carga mientras se redirige
  }

  if (!isLogged) {
    return null; // O puedes mostrar una página de acceso denegado o redirigir
  }

  return <>{children}</>;
};

export default ProtectedPage;
