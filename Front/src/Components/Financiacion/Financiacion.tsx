"use client";

import React, { useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";

const Financiacion = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Animación activada solo una vez
  const animationSettings = {
    type: "spring",
    stiffness: 22,
    duration: 2,
  };

  return (
    <div className="m-4 my-4 flex items-center justify-center">
      <div className="w-full flex justify-center sm:w-[100%] p-6 rounded-lg shadow-2xl bg-white">
        <div className="w-[88%] relative lg:flex items-center lg:gap-8" ref={ref}>
          {/* Imágenes a la izquierda */}
          {isInView && (
            <motion.div
              className="relative w-full sm:w-[40%] md:w-[30%] lg:w-[20%] flex-shrink-0 hidden md:block"
              initial={{ x: "-100vw" }}
              animate={{ x: "0%" }}
              transition={{
                ...animationSettings,
                delay: 0.1, // Ligeramente después del texto
              }}
            >
              <div className="space-y-[-15px]">
                <Suspense fallback={<div>Loading images...</div>}>
                  <motion.img
                    src="/source/TCrossCostado.webp"
                    alt="Volkswagen T-Cross"
                    className="w-full h-auto object-contain transform scale-x-[-1] motion-blur"
                    animate={{
                      filter: ["blur(5px)", "blur(0px)"],
                    }}
                    transition={{
                      duration: 1,
                    }}
                    loading="lazy"
                  />
                  <motion.img
                    src="/source/TiguanCostado.webp"
                    alt="Volkswagen Tiguan"
                    className="w-full h-auto object-contain transform scale-x-[-1] motion-blur"
                    animate={{
                      filter: ["blur(5px)", "blur(0px)"],
                    }}
                    transition={{
                      duration: 1,
                    }}
                    loading="lazy"
                  />
                  <motion.img
                    src="/source/NivusCostado.webp"
                    alt="Volkswagen Nivus"
                    className="w-full h-auto object-contain transform scale-x-[-1] motion-blur"
                    animate={{
                      filter: ["blur(5px)", "blur(0px)"],
                    }}
                    transition={{
                      duration: 1,
                    }}
                    loading="lazy"
                  />
                </Suspense>
              </div>
            </motion.div>
          )}

          {/* Texto a la derecha */}
          {isInView && (
            <motion.div
              className="flex-1 pl-8 sm:pl-4"
              initial={{ x: "-100vw" }}
              animate={{ x: "0%" }}
              transition={{
                ...animationSettings,
                delay: 0.1, // Apenas antes de las imágenes
              }}
            >
              <div className="border-l-4 border-red-500 h-auto pl-4 mb-4 inline-block">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Si no llegas con el efectivo ¡Podés financiarlo!
                </h2>
                <p className="text-gray-600">
                  Trabajamos con las mejores líneas de créditos, prendarios y personales, con demostración de ingresos o solo con DNI. Todos nuestros créditos son con entrega inmediata.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 mt-4 inline-block">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Entidades financieras
                </h2>
                <p className="text-gray-600">
                  Financiamos a través de distintas entidades bancarias como Banco de Córdoba, Banco Santander, Banco Supervielle y Banco HSBC. También recibimos tarjetas de crédito.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 mt-4 inline-block">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  ¿Quieres averiguar tu crédito disponible?
                </h2>
                <p className="text-gray-600">
                  Podes financiar hasta un 100% del vehículo que elijas. Contáctanos para brindarte toda la información y ayudarte a financiar tu próximo auto.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Financiacion;
