"use client";

import React, { useContext, useEffect } from "react";
import { UserContext } from "@/Context/contextUser";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { UserRole } from "@/Interfaces/Interface";

const ROLE_HOME: Record<UserRole, string> = {
  admin: "/views/admin",
  empleado: "/views/tareas",
};

const ProtectedPage: React.FC<{ children: React.ReactNode; allowedRoles?: UserRole[] }> = ({
  children,
  allowedRoles,
}) => {
  const { isLogged, user, sessionExpired, authReady } = useContext(UserContext);
  const router = useRouter();

  // Si el token todavía no trae role (backend viejo/migración pendiente), no bloqueamos:
  // se mantiene el comportamiento actual hasta que el backend empiece a mandar el rol.
  const role = user?.role;
  const roleMismatch = !!allowedRoles && !!role && !allowedRoles.includes(role);

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
      return;
    }
    if (roleMismatch && role) {
      // Está logueado pero no tiene permiso acá: lo mandamos a su propia sección, no al login.
      router.push(ROLE_HOME[role]);
    }
  }, [authReady, isLogged, sessionExpired, roleMismatch, role, router]);

  if (!authReady || !isLogged || roleMismatch) return null;

  return <>{children}</>;
};

export default ProtectedPage;
