"use client";
import FondoImage from "@/Assets/TableroCronos.webp";
import React from "react";
import Image from "next/image";

const FondoNav = () => {
  return (
    <div className="relative h-[260px] md:h-[450px] overflow-hidden md:mx-4">
      <Image
        src={FondoImage}
        alt="Imagen de fondo del tablero Cronos con detalles de cronómetros y velocidad"
        fill
        className="object-cover transition-all duration-300 ease-in-out md:object-[50%_15%] object-center"
        quality={80} // Reducir la calidad para optimizar el rendimiento
        priority // Asegura la carga temprana si la imagen es importante
      />
    </div>
  );
};

export default FondoNav;
