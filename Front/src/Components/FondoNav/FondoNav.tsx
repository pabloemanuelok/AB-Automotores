"use client";
import FondoImage from "@/Assets/PruebaFondo1.svg";
import React from "react";
import Image from "next/image";

const FondoNav = () => {
  return (
    <div className="relative h-[260px] md:h-[240px] overflow-hidden ">
      <Image
        src={FondoImage}
        alt="Imagen de fondo del tablero Cronos con detalles de cronómetros y velocidad"
        fill
        className="object-cover md:object- transition-all duration-300 ease-in-out md:object-[50%_15%] "
        quality={80} // Reducir la calidad para optimizar el rendimiento
        priority // Asegura la carga temprana si la imagen es importante
      />
    </div>
  );
};

export default FondoNav;
