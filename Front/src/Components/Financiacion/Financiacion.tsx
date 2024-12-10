"use client";

import React, { useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";

const Financiacion = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Solo se activa la animación una vez

  return (
    <div className="my-4 flex items-center justify-center md:px-4">
      <div className="w-full sm:w-[84%] p- rounded-lg shadow-2xl bg-white mr-2">
        <div className="relative lg:flex lg:items-center lg:gap-8" ref={ref}>
          {/* Contenedor de texto a la izquierda */}
          {isInView && (
            <motion.div
              className="flex-1 pl-8"
              initial={{ x: "-100vw" }} // Empieza fuera del borde izquierdo de la pantalla
              animate={{ x: "0%" }} // Llega a su posición final
              transition={{
                type: "spring",
                stiffness: 22,
                duration: 2,
                delay: 0.05,
              }}
            >
              <div className="border-l-4 border-red-500 pl-4 mb-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Si no llegas con el efectivo ¡Podés financiarlo!
                </h2>
                <p className="text-gray-600">
                  Trabajamos con las mejores líneas de créditos, prendarios y
                  personales, con demostración de ingresos o solo con DNI. Todos
                  nuestros créditos son con entrega inmediata.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 mt-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Entidades financieras
                </h2>
                <p className="text-gray-600">
                  Financiamos a través de distintas entidades bancarias como Banco de Córdoba, Banco Santander, Banco
                  Supervielle y Banco HSBC. También recibimos tarjetas de crédito.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 mt-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  ¿Quieres averiguar tu crédito disponible?
                </h2>
                <p className="text-gray-600">
                  Podes financiar hasta un 100% del vehículo que elijas. Contáctanos para brindarte toda la información y ayudarte a
                  financiar tu próximo auto.
                </p>
              </div>
            </motion.div>
          )}

          {/* Camionetas que acompañan el contenido a la derecha (solo en pantallas grandes) */}
          {isInView && (
            <motion.div
              className="relative w-full sm:w-[30%] md:w-[20%] flex-shrink-0 hidden md:block"
              initial={{ x: "-100vw" }}
              animate={{ x: "0%" }}
              transition={{
                type: "spring",
                stiffness: 22,
                duration: 2,
              }}
            >
              <div className="space-y-[-10px]">
                <Suspense fallback={<div>Loading images...</div>}>
                  {/* Lazy loading de imágenes */}
                  <motion.img
                    src="/source/TCrossCostado.webp"
                    alt="Camioneta"
                    className="w-full h-auto object-contain transform scale-x-[-1] motion-blur"
                    animate={{
                      filter: ["blur(5px)", "blur(0px)"],
                    }}
                    transition={{
                      duration: 1,
                    }}
                    loading="lazy" // Carga perezosa para optimizar
                  />
                  <motion.img
                    src="/source/TiguanCostado.webp"
                    alt="Camioneta"
                    className="w-full h-auto object-contain transform scale-x-[-1] motion-blur"
                    animate={{
                      filter: ["blur(5px)", "blur(0px)"],
                    }}
                    transition={{
                      duration: 1,
                    }}
                    loading="lazy" // Carga perezosa para optimizar
                  />
                  <motion.img
                    src="/source/NivusCostado.webp"
                    alt="Camioneta"
                    className="w-[100%] h-auto object-contain transform scale-x-[-1] motion-blur"
                    animate={{
                      filter: ["blur(5px)", "blur(0px)"],
                    }}
                    transition={{
                      duration: 1,
                    }}
                    loading="lazy" // Carga perezosa para optimizar
                  />
                </Suspense>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Financiacion;
