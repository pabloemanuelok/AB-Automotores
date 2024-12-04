"use client";

import { useEffect } from "react";

export default function TailwindInitializer() {
  useEffect(() => {
    // Eliminamos la clase `hidden` del cuerpo cuando Tailwind esté cargado.
    document.body.classList.remove("invisible");
  }, []);

  return null; // Este componente no necesita renderizar nada
}