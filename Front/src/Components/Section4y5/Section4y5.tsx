import React from "react";
import Image from "next/image";

// Importa los logos desde tu carpeta de assets
import logo1 from "@/Assets/VehiculosSeleccionados.webp";
import logo2 from "@/Assets/EntregaInmediata.webp";
import logo3 from "@/Assets/financiacion51.webp";
import logo4 from "@/Assets/permutas mayor y menor 3 1.webp";
import logo5 from "@/Assets/ServiciosDeGestoria.webp";

const SectionUnified = () => {
  return (
    <div className="bg-white flex flex-col md:flex-row items-center gap-6 my-4 p-4 md:m-4 overflow-hidden">
      {/* Título */}
      <div className="w-full text-center flex justify-center md:justify-start items-center md:text-start lg:pl-[100px] min-h-[60px]">
        <h2 className="text-black text-2xl lg:text-2xl xl:text-3xl font-bold">
          ¡Comprá tu auto y retiralo en el acto!
        </h2>
      </div>

      {/* Logos */}
      <div className="flex md:justify-between justify-center gap-4 w-full lg:pr-[80px]">
  {[logo1, logo2, logo3, logo4, logo5].map((logo, index) => (
    <div
      key={index}
      className="flex flex-col items-center h-20 min-w-[60px] max-w-[60px] md:min-w-[80px] md:max-w-[80px] min-h-[80px]"
    >
      <div className="flex items-center justify-center h-10 mb-1 min-h-[50px]">
        <Image
          src={logo}
          alt={`Logo ${index + 1} - ${[
            "Vehículos Seleccionados",
            "Entrega inmediata",
            "Líneas de créditos",
            "Compras y permutas",
            "Servicios de gestoría",
          ][index]}`}
          width={40}
          height={40}
          className="object-contain md:w-[50px] md:h-[50px]"
        />
      </div>
      <span className="text-black text-center font-semibold text-xs md:text-sm leading-tight">
        {[
          "Vehículos Seleccionados",
          "Entrega inmediata",
          "Líneas de créditos",
          "Compras y permutas",
          "Servicios de gestoría",
        ][index]}
      </span>
    </div>
  ))}
</div>
    </div>
  );
};

export default SectionUnified;
