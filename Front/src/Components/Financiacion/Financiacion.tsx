"use client";

import React from "react";
import Image from "next/image";

const Financiacion = () => {
  return (
    <div className="my-4 flex items-center justify-center md:px-4">
      <div className="w-[83%] p-6 rounded-lg shadow-2xl bg-white">
        {/* Sección de texto con animación */}
        <div className="lg:flex lg:justify-between gap-8 animate-fade-in">
          <div className="flex-1 mb-6 lg:mb-0">
            <div className="border-l-4 border-red-500 pl-4 mb-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Si no llegas con el efectivo <br /> ¡Podés financiarlo!
              </h2>
              <p className="text-gray-600">
                Créditos bancarios, personales ó prendarios, a través de Banco de Córdoba, Banco Santander o Banco HSBC. <br />
                También financiamos solo con el DNI y recibimos tarjetas de crédito. Pedinos más información!
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 mt-4">
                ¿Quieres averiguar tu crédito disponible?
              </h2>
              <p className="text-gray-600">
                Contáctanos para brindarte toda la información y ayudarte a financiar tu próximo auto.
              </p>
            </div>
          </div>

          {/* Imagen de financiación */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full md:w-[60%] h-64 lg:h-80 rounded-md overflow-hidden shadow-md">
              <Image
                src="/source/Negociacion.webp" // Ruta desde la carpeta public
                alt="Imagen representativa de financiación"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financiacion;
