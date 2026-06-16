"use client"

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/Context/contextUser";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLogged, sessionExpired } = useContext(UserContext);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
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
  }, [mounted, isLogged, sessionExpired, router]);

  if (!mounted || !isLogged) return null;

  return <>{children}</>;
};

export default ProtectedPage;
