"use client";

import React, { useContext, useEffect } from "react";
import { UserContext } from "@/Context/contextUser";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLogged, sessionExpired, authReady } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // authReady evita redirigir mientras el contexto todavía no leyó el token.
    if (!authReady) return;

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
      router.push("/views/login");
    }
  }, [authReady, isLogged, sessionExpired, router]);

  if (!authReady || !isLogged) return null;

  return <>{children}</>;
};

export default ProtectedPage;
