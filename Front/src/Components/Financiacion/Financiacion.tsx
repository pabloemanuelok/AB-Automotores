"use client";

import React from "react";
import { motion } from "framer-motion";

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
                Trabajamos con las mejores lineas de créditos, prendarios y personales, con demostracion de ingresos o solo con DNI. Todos nuestros creditos son con entrega inmediata.
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
            <div className="border-l-4 border-red-500 pl-4 mt-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Entidades financieras
              </h2>
              <p className="text-gray-600">
                Financiamos a traves de Banco de Cordoba, Banco Santander, Banco Supervielle y Banco HSBC. Tambien recibimos tarjetas de creditos
              </p>
            </div>
          </div>

          {/* Imagen de financiación */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full md:w-[60%] h-64 gap-10 lg:h-80 rounded-md overflow-hidden shadow-md">
              {/* Animación del primer auto (superior) */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                initial={{ x: "100%" }} // Inicialmente fuera de la pantalla a la derecha
                animate={{ x: 0 }} // Animación hacia la izquierda (posición final)
                transition={{ type: "spring", stiffness: 100, duration: 2 }}
              >
                <img
                  src="/source/ToroCostado.webp" // Ruta de imagen del primer auto
                  alt="Auto 1"
                  className="w-full h-100 object-cover"
                />
              </motion.div>

              {/* Animación del segundo auto (inferior) */}
              <motion.div
                className="absolute top-32 left-0 w-full h-full"
                initial={{ x: "100%" }} // Inicialmente fuera de la pantalla a la derecha
                animate={{ x: 0 }} // Animación hacia la izquierda (posición final)
                transition={{ type: "spring", stiffness: 100, duration: 2, delay: 0.5 }}
              >
                <img
                  src="/source/ToroCostado.webp" // Ruta de imagen del segundo auto
                  alt="Auto 2"
                  className="w-full h-100 object-cover transform scale-x-[-1]" // Invertir el segundo auto para marcha atrás
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financiacion;
